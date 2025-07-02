package main

import (
	"fmt"
	"net/http"
)
 var Handler=http.HandlerFunc(func(w http.ResponseWriter, r * http.Request){
	   fmt.Printf("welcome to our website")
         fmt.Fprintln(w,"hello acco coders")
		 fmt.Printf("Thanks for left the website ")
})
func secure(next http.Handler) http.Handler{
return http.HandlerFunc(func(w http.ResponseWriter, r * http.Request){
	fmt.Println("welocme to securiy section")
	w.Header().Set("Content-Security-Policy","default-src self")
	w.Header().Set("x-Frame-Options","DENY")
	next.ServeHTTP(w,r)
	

})
}
func logger(next http.Handler)http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r * http.Request){
	  fmt.Println("welcome to our logger function")
	  next.ServeHTTP(w,r);
	  fmt.Println("Please visit again in our website ")
	})
}
func main(){
mux:=http.NewServeMux();
mux.Handle("/",logger(secure(Handler)));
http.ListenAndServe(":8000",mux)
}