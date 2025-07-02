package main

import (
	"fmt"
	"time"
)
func solve(idx int,ch chan int){
	fmt.Printf("%d sending the message\n ",idx);
	ch<-idx;
	fmt.Printf("%d send the message\n",idx)
}
func main(){
	ch:=make(chan int);
	for i := 0; i <10; i++{
		go solve(i,ch);
	}

    for i := 0; i <10; i++ {
		
        val := <-ch 
        fmt.Printf("Main: Received data %d from channel\n", val)
    }
	time.Sleep(10*time.Second)
}