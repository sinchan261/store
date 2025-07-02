package main

import (
	"fmt"
	"runtime"
	"sync"
	"time"
)
func printnumbers(){
	for i:=range 10 {
    fmt.Println(i)

	fmt.Printf("%d is completed",i)
	}
	
}
func worker(id int,wq *sync.WaitGroup,delay time.Duration){
	defer wq.Done()
	fmt.Println("app is started to running");
	time.Sleep(delay)
	fmt.Println("app is completed ")
//   for i:=0;i<4;i++{
//    fmt.Printf("main id is %d and counter is %d\n",id,i)
//   }
}
func main() {
	runtime.GOMAXPROCS(2)
  var wg sync.WaitGroup;
  for i:=range(4){
	wg.Add(1);
	go worker(i,&wg,time.Duration(i)*time.Second);
  }
wg.Wait();

go printnumbers();
time.Sleep(10*time.Second)
fmt.Println(" i am the main go routines ");
}