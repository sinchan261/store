package Routes

import (
	"Fiberr/controllers"
	"net/http"
)

func DeleteCarinfo() http.Handler{
	mux:=http.NewServeMux()
	mux.HandleFunc("/",controllers.DeleteCar)
	return mux
}