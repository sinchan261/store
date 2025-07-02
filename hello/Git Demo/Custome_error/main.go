package main

import (
	"errors"
	"fmt"
)

// type error interface {
// 	Error() string
// }
type CustomError struct {
	code    int
	message string
}

// func (c CustomError) Error() string {
// 	return fmt.Sprintf("error code%d-%s",c.code,c.message)
// }
// func call_error(e CustomError)string{
// 	// fmt.Println( e.Error())
// 	return e.Error()
// }
func (e*CustomError) Error()string{
return fmt.Sprintf("%d,%s",e.code,e.message)
}
func call(c CustomError)error{
return fmt.Errorf("something failed %w",&c)
}
func main() {
	// var c cutomeError;
	var c CustomError=CustomError{
		code:7282,
		message:"error is occured",
	}
fmt.Println(call(c))
var ce *CustomError;
if errors.As(call(c),&ce){
	fmt.Println("hello")
}
}