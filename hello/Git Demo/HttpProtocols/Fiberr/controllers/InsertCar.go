package controllers

import (
	"Fiberr/config"
	"Fiberr/models"
	"encoding/json"
	"fmt"
	"net/http"

)
func Insert_car(w http.ResponseWriter, r *http.Request){
	var carstruct models.CarStruct;
     models.CarModels()
	db:=config.Connectdb()
  err:=json.NewDecoder(r.Body).Decode(&carstruct)
  if err!=nil {
	fmt.Println("Error occured due to some Decode failed")
	
  }
  exec:=`insert  into carmodel (id,name,engine,age) values($1,$2,$3,$4)`
    _,err=db.Exec(exec,carstruct.Id,carstruct.Name,carstruct.Engine,carstruct.Age)
  if err!=nil{
	http.Error(w,"Insertion failed",http.StatusBadRequest)
	return;
  }
  w.WriteHeader(http.StatusAccepted)
 json.NewEncoder(w).Encode(map[string]string{
	"message":"successfully inserted into database",
})
   

}