package controllers

import (
	"Fiberr/config"

	"net/http"
	"strconv"
)

func DeleteCar(w http.ResponseWriter, r *http.Request){
	db:=config.Connectdb()
	idstr:=r.URL.Query().Get("id")
	id,_:=strconv.ParseInt(idstr,10,64)
	
	code:=`delete from carmodel where id=$1`
	result,err:=db.Exec(code,id)
	if err!=nil{
		http.Error(w,"Deletion failed due to some reason",http.StatusBadRequest)
		return;
	}
  value,error:= result.RowsAffected()
     if error!=nil{
		http.Error(w,"deletion error",http.StatusBadRequest)
		return;
	 }

    if value==0{
		http.Error(w,"No user deleted",http.StatusBadRequest)
		return;
	}
    w.Header().Set("Content-Type","text/plain")
	w.WriteHeader(http.StatusAccepted);
	w.Write([]byte("user deleted"))
}