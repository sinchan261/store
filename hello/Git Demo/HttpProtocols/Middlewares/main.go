package main

import (
	"fmt"
	"net/http"
)
func HelloHandler(w http.ResponseWriter,r*http.Request){
	fmt.Println("welcoms to our website")
	fmt.Fprintf(w,"Hello world")
}
func logger(next http.Handler)(http.Handler){
    return http.HandlerFunc(func(w http.ResponseWriter,r*http.Request){
		fmt.Println("Before calling the main function")
		next.ServeHTTP(w,r);
		fmt.Println("After calling the main function")
	
	})
}
var Shorter=http.HandlerFunc(HelloHandler)
var Bigger=http.HandlerFunc(func(w http.ResponseWriter,r*http.Request){
	fmt.Println("welcoms to /check  website")
	fmt.Fprintf(w,"Hello world from /check")
})
var Gd=logger(Bigger)
func main(){
	fmt.Println("helllo world")
	mux:=http.NewServeMux()
	mux.Handle("/",logger(Shorter))
	mux.HandleFunc("/check",func(w http.ResponseWriter,r*http.Request){
		 fmt.Println("before calling serveHttp")
		//  Shorter.ServeHTTP(w,r);
		Gd.ServeHTTP(w,r)
		 fmt.Println("After calling the Http Server")
	})
	  http.ListenAndServe(":8000", mux)
}    