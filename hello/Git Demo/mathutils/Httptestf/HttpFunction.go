package HttpTestf

import (
	"encoding/json"
	"net/http"
)

func Httpfunction(w http.ResponseWriter,r*http.Request){
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message":"car created"}`))
}
func Getfunction(w http.ResponseWriter,r*http.Request){
	var data map [string]string;
	data=map[string]string{
		"name":"saikat",
		"middle":"sinchan",
		"last":"Ghosh",
	}
	w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
func AllCar(w http.ResponseWriter, r *http.Request){
	id:=r.URL.Query().Get("id");
	cars:=map[string]string{
		"1":"Tesla",
		"2":"BMW",
		"3":"Toyota",
	}
	name:=cars[id];
	if name=="" {
		http.Error(w,"Car not found",http.StatusNotFound)
		return;
	}
	json.NewEncoder(w).Encode(map[string]string{
       "name":name,
	})
}