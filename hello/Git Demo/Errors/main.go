package main

import (
	
	"fmt"
)


type message struct{
	code int 
	message string
}
func (c message) Error()string{
	return fmt.Sprintf("Error code is :%d ,message is :%s",c.code,c.message)
}
func check(code int)error{
	if code==404{
		return message{	code:404,message:"divison not allowed"}
	}
	return nil
}
func main(){


fmt.Println(check(404))
}