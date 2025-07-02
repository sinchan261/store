package Routes

import (
	"Fiberr/controllers"
	"net/http"
)

func Insert() http.Handler{
mux:=http.NewServeMux()
mux.HandleFunc("/", controllers.Insert_car)
return mux
}