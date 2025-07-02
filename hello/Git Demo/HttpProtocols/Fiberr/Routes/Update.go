package Routes

import (
	"Fiberr/controllers"
	"net/http"
)

func Update() http.Handler{
mux:=http.NewServeMux()
mux.HandleFunc("/", controllers.Update)
return mux
}