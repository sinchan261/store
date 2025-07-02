package main
import( "fmt"
// "time"
)
func sender(ch chan <-int){
for i:=1;i<=10;i++ {
    ch<-i;
    fmt.Println("sender sent:",i);
}
close(ch);
fmt.Println("sender close the channel");
}
func receiver(ch <-chan int){
for val:=range(ch){
 fmt.Println("Receiver got:", val)
}
fmt.Println("Receiver finished reading")
}
func main() {
ch:=make(chan int);
go sender(ch );

receiver(ch);

}