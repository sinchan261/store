package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type userData struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

var Users []userData

func main(){
	Users = []userData{
		{Name: "Saikat Sinchan Ghosh", Age: 282},
	}
	router:=mux.NewRouter()
	router.HandleFunc("/",welcome).Methods("GET");
	router.HandleFunc("/data",sendJson).Methods("GET")
     fmt.Println("server is started at : ",8000)
   http.ListenAndServe(":8000",router)

}
func sendJson(w http.ResponseWriter,r*http.Request){
	w.Header().Set("Content/type","application/json")
	data,_:=json.Marshal(Users)
	w.Write((data))
	// json.NewEncoder(w).Encode(Users)

}
func welcome(w http.ResponseWriter,r*http.Request){
	w.Header().Set("Content-Type","text/plain")
	w.Write([]byte("hello"))
}