package main

import (
	"HttpsThree/config"
	"HttpsThree/models"
	_"HttpsThree/docs"
	"HttpsThree/utils"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
     "github.com/swaggo/http-swagger"
	"github.com/gorilla/mux"
)

var Db *sql.DB = config.Connect()

// MessageResponse is used for Swagger documentation of plain text responses
// This avoids "cannot find type definition: string" errors
// It should be declared in models.go ideally
// For this demo, we're declaring it here
// Remove this if it's already defined in models package
type MessageResponse struct {
	Message string `json:"message" example:"successfully created"`
}
type UpdateRequest struct {
	Id   string `json:"id" example:"1"`
	Name string `json:"name" example:"saikat sinchan ghosh"`
}
//@title car inventory api
//@version 1.0
//@decription api document for the car inventory system
//@host localhost 5173
//@basepath /
func main() {
	_, errt := utils.CreateUsers()
	if errt != nil {
		log.Fatalf("Insertion failed due to table creation problem")
	}

	router := mux.NewRouter()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome to our website"))
	}).Methods("GET")

	router.HandleFunc("/insert", insertfunc).Methods("POST")
	router.HandleFunc("/getdata", getdata).Methods("GET")
	router.HandleFunc("/getOne/{id}", getOne).Methods("GET")
	router.HandleFunc("/delete/{id}", deleteUser).Methods("DELETE")
	router.HandleFunc("/update", update).Methods("PUT")
    router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)
	fmt.Println("server is running in 5173 port")
	log.Fatal(http.ListenAndServe(":5173", router))
}

// @Summary      Create a new user
// @Description  Insert a user into users table
// @Tags         Users
// @Accept       json
// @Produce      json
// @Param        user body models.User true "User Object"
// @Success      202 {object} MessageResponse "Successfully created user"
// @Failure      400 {object} MessageResponse "Insertion failed due to credentials issue"
// @Router       /insert [post]
func insertfunc(w http.ResponseWriter, r *http.Request) {
	var userInfo models.User
	json.NewDecoder(r.Body).Decode(&userInfo)
	insert := `insert into users (id,name,email,age)values($1,$2,$3,$4)`
	_, err := Db.Exec(insert, userInfo.Id, userInfo.Name, userInfo.Email, userInfo.Age)
	if err != nil {
		http.Error(w, "Insertion failed due to credentials issue", http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(MessageResponse{Message: "Successfully created user"})
}

// @Summary      Get all data
// @Description  Retrieve all users from the database
// @Tags         Users
// @Produce      json
// @Success      200 {array} models.User "Multiple users"
// @Failure      500 {object} MessageResponse "Internal server error"
// @Router       /getdata [get]
func getdata(w http.ResponseWriter, r *http.Request) {
	var users []models.User
	rows, err := Db.Query("select * from users")
	if err != nil {
		http.Error(w, "Error querying users", http.StatusInternalServerError)
		return
	}
	for rows.Next() {
		var user models.User
		err := rows.Scan(&user.Id, &user.Name, &user.Email, &user.Age)
		if err != nil {
			http.Error(w, "error scanning user", http.StatusInternalServerError)
			return
		}
		users = append(users, user)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

// @Summary      Get user by ID
// @Description  Retrieve one user from the database using ID
// @Tags         Users
// @Produce      json
// @Success      200 {object} models.User
// @Failure      400 {object} MessageResponse "Invalid user ID"
// @Failure      500 {object} MessageResponse "Query error"
// @Router       /getOne/{id} [get]
func getOne(w http.ResponseWriter, r *http.Request) {
	var users models.User
	par := mux.Vars(r)
	ids := par["id"]
	id, err := strconv.Atoi(ids)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}
	err = Db.QueryRow("SELECT id, name, email, age FROM users WHERE id = $1", id).
		Scan(&users.Id, &users.Name, &users.Email, &users.Age)
	if err == sql.ErrNoRows {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "Query error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

// @Summary      Delete user
// @Description  Delete particular user from database
// @Tags         Users
// @Produce      json
// @Param        id path int true "User ID"
// @Success      200 {object} MessageResponse "User deleted successfully"
// @Failure      400 {object} MessageResponse "Invalid user ID"
// @Failure      404 {object} MessageResponse "No user found to delete"
// @Failure      500 {object} MessageResponse "Error deleting user or checking result"
// @Router       /delete/{id} [delete]
func deleteUser(w http.ResponseWriter, r *http.Request) {
	par := mux.Vars(r)
	ids := par["id"]
	id, err := strconv.Atoi(ids)
	if err != nil {
		http.Error(w, "Invalid user id", http.StatusBadRequest)
		return
	}
	result, err := Db.Exec("DELETE FROM users WHERE id=$1", id)
	if err != nil {
		http.Error(w, "Error deleting user", http.StatusInternalServerError)
		return
	}
	rowsaf, err := result.RowsAffected()
	if err != nil {
		http.Error(w, "Error checking delete result", http.StatusInternalServerError)
		return
	}
	if rowsaf == 0 {
		http.Error(w, "No user found to delete", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(MessageResponse{Message: "User deleted successfully"})
}

// @Summary      Update user's name
// @Description  Update a user's name using ID
// @Tags         Users
// @Accept       json
// @Produce      json
// @Param        request body UpdateRequest  true "Update request"
// @Success      202 {object} MessageResponse "Successfully updated user"
// @Failure      400 {object} MessageResponse "Invalid user ID or update failed"
// @Failure      202 {object} MessageResponse "No user found for update"
// @Router       /update [put]
func update(w http.ResponseWriter, r *http.Request) {
	type request struct {
		Id   string `json:"id"`
		Name string `json:"name"`
	}

	var up request
	json.NewDecoder(r.Body).Decode(&up)
	Id, err := strconv.ParseInt(up.Id, 10, 64)
	if err != nil {
		http.Error(w, "Provided the correct ID", http.StatusBadRequest)
		return
	}
	query := `update users set name=$1 where id=$2`
	result, err := Db.Exec(query, up.Name, Id)
	if err != nil {
		http.Error(w, "Result is not updated", http.StatusBadRequest)
		return
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		http.Error(w, "Error checking update result", http.StatusInternalServerError)
		return
	}
	if rowsAffected == 0 {
		http.Error(w, "No user found for update", http.StatusAccepted)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(MessageResponse{Message: "Successfully updated user"})
}
