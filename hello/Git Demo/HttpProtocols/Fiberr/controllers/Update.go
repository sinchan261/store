package controllers

import (
	"Fiberr/config"
	"encoding/json"
	"net/http"
	"strconv"
)

type UpdatePayload struct {
	Name string `json:"name"`
}
func Update(w http.ResponseWriter, r *http.Request) {
	// Step 1: Connect to DB
	db := config.Connectdb()
	defer db.Close()

	// Step 2: Extract id from URL
		idstr:=r.URL.Query().Get("id")
	id,_:=strconv.ParseInt(idstr,10,64)
	


	// Step 3: Decode JSON body (expects: {"name": "newname"})
	var payload UpdatePayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil || payload.Name == "" {
		http.Error(w, "Invalid JSON or missing 'name' field", http.StatusBadRequest)
		return
	}

	// Step 4: Prepare & execute update query
	query := `UPDATE carmodel SET name = $1 WHERE id = $2`
	result, err := db.Exec(query, payload.Name, id)
	if err != nil {
		http.Error(w, "Database update failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Step 5: Check affected rows
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		http.Error(w, "Could not fetch rows affected", http.StatusInternalServerError)
		return
	}
	if rowsAffected == 0 {
		http.Error(w, "No record found with this ID", http.StatusNotFound)
		return
	}

	// Step 6: Respond with success
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Name updated successfully",
	})
}

