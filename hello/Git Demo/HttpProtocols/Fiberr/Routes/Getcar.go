package Routes

import (
	"Fiberr/controllers"
	"net/http"
)

func CarsGetOne()http.Handler {
mux:=http.NewServeMux()
mux.HandleFunc("/",controllers.CarsGetOne)

return mux
}
func CarsGet()http.Handler {
mux:=http.NewServeMux()

mux.HandleFunc("/",controllers.CarsGet)
return mux
}