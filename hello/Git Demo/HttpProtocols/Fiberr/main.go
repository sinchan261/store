package main

import (
	"Fiberr/Routes"
	"Fiberr/config"
	"fmt"
	"net/http"
)
func main(){
mux:=http.NewServeMux();
db:=config.Connectdb()
fmt.Println(db)
mux.Handle("/ic",Routes.Insert());
mux.Handle("/dc",Routes.DeleteCarinfo())
mux.Handle("/uc",Routes.Update())
mux.Handle("/gco",Routes.CarsGetOne())
mux.Handle("/gc",Routes.CarsGet())
mux.HandleFunc("/",func(w http.ResponseWriter,r*http.Request){
 fmt.Fprintln(w,"Welcome to our website")
})
http.ListenAndServe(":8000",mux);

}