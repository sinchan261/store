package main
import "fmt"
func sender(ch chan int){
    for i:=0;i<5;i++{
        ch<-i;
        fmt.Println("hello")
    }
    close(ch);
}
func main() {
 ch:=make(chan int);
 go sender(ch);
 for i:=0;i<8;i++{
     fmt.Println(<-ch);
 }
 fmt.Println("channel is closed")
}