package main

import (
	"encoding/json"
	"fmt"
	"log"
	"strconv"

	"net/http"
	"sync"
	"time"

	"github.com/gorilla/mux"
)
type Car struct{
	Id int64`json:"id"`
	Name string `json:"name`
	Company string `json:"company`
	YearOfManufacturing int `json:"year"`
	cost float64 `json:Cost`
}
var(
	carInventory=make(map[int64]*Car)
	mutex sync.Mutex
)
func generateID() int64 {
	return time.Now().UnixNano()
}
func main(){
   router:=mux.NewRouter();
   router.HandleFunc("/",func(w http.ResponseWriter,r*http.Request){
	w.Write([]byte("welcome to our website"))
   }).Methods("Get")
   router.HandleFunc("/cars",addcar).Methods("POST")
   router.HandleFunc("/getcars",getcar).Methods("Get")
   router.HandleFunc("/cars/{id}",getCarHandler).Methods("Get")
     router.HandleFunc("/cars/delete/{id}",DeleteData).Methods("Get")
   	fmt.Println("🚀 Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))

}
func getcar(w http.ResponseWriter,r *http.Request){
	data,err:=json.Marshal(carInventory);
	if err!=nil{
		http.Error(w,"data are not availaible",http.StatusBadRequest)
	}
	w.Write(data);
}
func addcar(w http.ResponseWriter,r* http.Request ){
var car Car
if err:=json.NewDecoder(r.Body).Decode(&car);err!=nil{
     http.Error(w,"invalid request body",http.StatusBadRequest)
	return;
}
mutex.Lock()
defer mutex.Unlock()
car.Id = generateID()
carInventory[car.Id]=&car
w.Header().Set("Content-Type","application/json")
w.WriteHeader(http.StatusCreated);
data,_:=json.Marshal(car)
w.Write(data)
}

func getCarHandler(w http.ResponseWriter,r*http.Request){
   vars:=mux.Vars(r);
   idstr:=vars["id"];
   var convertId int64;
   if data,err:=strconv.ParseInt(idstr,10,64);err!=nil{
	  http.Error(w,"Provided id is not Vaild",http.StatusBadRequest)
	  return;
   }else{
	convertId=data
   }
  mutex.Lock();

  car,exists:=carInventory[convertId]
  mutex.Unlock()
  if(!exists){
	http.NotFound(w,r)
  }

 w.Header().Set("Content-Type","application/json")
 v,_:=json.Marshal(car);
 w.Write(v);
//  json.NewEncoder(w).Encode(car)

}

func DeleteData(w http.ResponseWriter,r* http.Request){
	vars:=mux.Vars(r);
	ids:=vars["id"];
	var ID int64;
	if data,err:=strconv.ParseInt(ids,10,64);err!=nil{
     http.Error(w,"id is invalid",http.StatusBadRequest)
	 return;
	}else{
		ID=data
	}
   mutex.Lock();
   delete(carInventory,ID)
   mutex.Unlock();
   w.WriteHeader(http.StatusNoContent)

}