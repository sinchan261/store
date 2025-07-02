package controllers

import (
	"Fiberr/config"
	"Fiberr/models"
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
)

func CarsGetOne(w http.ResponseWriter,r*http.Request) {
	var data models.CarStruct;
	db:=config.Connectdb()
	// mux:=http.NewServeMux();
		idstr:=r.URL.Query().Get("id")
	id,_:=strconv.ParseInt(idstr,10,64)
	
	code:=`select id,name,engine,age from carmodel where id=$1`
	err:= db.QueryRow(code,id).Scan(&data.Id, &data.Name, &data.Engine, &data.Age)
	if err!=nil{
		http.Error(w,"Database error",http.StatusBadRequest)
		return;
	}
	if err==sql.ErrNoRows{
		http.Error(w,"No user found",http.StatusBadRequest)
		return;
	}
	w.Header().Set("Content-Type","Application/json");
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(data);
}

func CarsGet(w http.ResponseWriter,r*http.Request) {
		db:=config.Connectdb()
		query:=`select id,name,engine,age FROM carmodel`
		rows,err:=db.Query(query);
		if err!=nil{
			http.Error(w,"Database query error",http.StatusInternalServerError)
			return;
		}

		var allcars []models.CarStruct
		for rows.Next(){
			var  car models.CarStruct
			err:=rows.Scan(&car.Id,&car.Name,&car.Engine,&car.Age)
			if err!=nil{
				http.Error(w,"error scnning row",http.StatusBadRequest)
				return;
			}
			allcars = append(allcars,car )
		}
			if err := rows.Err(); err != nil {
		http.Error(w, "Row iteration error", http.StatusInternalServerError)
		return
	}
		w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(allcars)
}
