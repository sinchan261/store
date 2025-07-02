
package main
import "fmt"
 func solve(ch chan string){
     fmt.Println("1st sender sending a message ");
     ch<-"welcome to our website";
     fmt.Println("1st sender send the message")
          fmt.Println("2nd sender sending a message ");
     ch<-"what is your name";
     fmt.Println("2nd sender send the message")
          fmt.Println("3rd sender sending a message ");
     ch<-"How are you";
     fmt.Println("3rd sender send the message")
          fmt.Println("4th sender sending a message ");
     ch<-"feeling good or not";
     fmt.Println("4h sender send the message")
 }
  func sender(ch chan string){
 fmt.Println("Sender: Sleeping for 2 seconds")

     fmt.Println("sender sending data");
     ch<-"hello welcome in go routine";
     fmt.Println("sender done is sending");
 }
func main() {
    ch:=make(chan string,1);
    var msg string;
    go solve(ch);
    msg=<-ch;
    fmt.Println(msg)
     fmt.Println("Recieved the message of 1st sender")
        msg=<-ch;
         fmt.Println(msg)
        fmt.Println("Recieved the message of 2nd sender")
   
        msg=<-ch;
    fmt.Println(msg)
     fmt.Println("Recieved the message of 3rd sender")
        msg=<-ch;
    fmt.Println(msg)
     fmt.Println("Recieved the message of 4th sender")

	     ch1:=make(chan string);
    
    go sender(ch1);
    fmt.Println("Main: receiver waiting for Recieved the mesages");
    msg1:=<-ch1;
    fmt.Println("Main: Receiver recived the messages: ",msg1);
    
}