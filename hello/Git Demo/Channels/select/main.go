package main
import "fmt"

func main() {
messages:=make(chan string,1)
signals:=make(chan bool);
select{
    case msg:=<-messages:
    fmt.Println("received messages",msg)
    default:
    fmt.Println("no messages are received")
}
msg:="hi"
select{
    case messages<-msg:
    fmt.Println("sent message:",msg)
    default:
    fmt.Println("no message sent ")
    
}
    select {
        case msg:=<-messages:
        fmt.Println("received messages:",msg)
        case sig:=<-signals:
        fmt.Println("received signal:",sig)
        default:
        fmt.Println("no activity");
    }
}


// package main
// import( "fmt"
//  "time"
// )

// func main() {
// c1:=make(chan string);
// c2:=make (chan string);
// go func(ch chan<-string){
//     ch<-"hello this is from c1"
// }(c1);
// go func(ch chan<-string){
//     ch<-"hello this is from c2"
// }(c2)
// time.Sleep(10*time.Second);
// for i:=0;i<2;i++{
//     select{
//         case mg1:=<-c1:
//          fmt.Println("Received,",mg1);
//              case mg2:=<-c2:
//          fmt.Println("Received",mg2)
//          case <-time.After(500*time.Millisecond):
//              fmt.Println("Time Out");
//     }
// }
// }

// package main

// import (
//     "fmt"
// )

// func main() {
//     messages := make(chan string)
//     signals := make(chan bool)

//     select {
//     case msg := <-messages:
//         fmt.Println("received message:", msg)
//     default:
//         fmt.Println("no message received")
//     }

//     msg := "hi"
//     select {
//     case messages <- msg:
//         fmt.Println("sent message:", msg)
//     default:
//         fmt.Println("no message sent")
//     }

//     select {
//     case msg := <-messages:
//         fmt.Println("received message:", msg)
//     case sig := <-signals:
//         fmt.Println("received signal:", sig)
//     default:
//         fmt.Println("no activity")
//     }
// }