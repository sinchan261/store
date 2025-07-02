package main

import (
	"fmt"
	"time"
)

// creating a observer
type Observer struct{
	Name string
	NotificationChannel chan string
}
//creating a subject
type NewsAggency struct{
	Observers []*Observer
}
type Subject interface{
	Register(*Observer);
	DeRegister(*Observer)
	NotifyAll(msg string)
}
//


//Register an Observer
func (a *NewsAggency) Register(observer *Observer){
	    a.Observers=append(a.Observers,observer)

}
func (a *NewsAggency) DeRegister(observer *Observer){
	for i,o:=range a.Observers{
  
         if o==observer{
	            a.Observers=append(a.Observers[:i],a.Observers[i+1:]...)
	            break;

                  }

	}
}


func (a*NewsAggency) NotifyAll(msg string){
	for _,o:=range a.Observers{
		notification:="Message is sent to the observer named"+o.Name+" "+msg
		o.NotificationChannel<-notification
		fmt.Println("successfully sending the message")
	}


}
func main(){
	newagg:=&NewsAggency{}
	observer1:=&Observer{
		Name:"saikat sinchan ghosh",
		NotificationChannel: make(chan string),
	}

	observer2:=&Observer{
		Name:"Mainak ghosh",
		NotificationChannel:make(chan string) ,
	}

	newagg.Register(observer1);
	newagg.Register(observer2)

	go func (){
       for message:=range observer1.NotificationChannel{
		fmt.Printf("%s received :%s\n",observer1.Name,message)
	   }
	}()
	go func() {
		newagg.NotifyAll("Update: GoLang is awesome!")
	}()

		go func (){
       for message:=range observer2.NotificationChannel{
		fmt.Printf("%s received :%s\n",observer2.Name,message)
	   }
	}()
	time.Sleep(1 * time.Second)

   fmt.Println("Deregistering observer : The Daily Times")
   newagg.DeRegister(observer1);
   go func(){
	newagg.NotifyAll("update:Golang is awosome");
   }()
     time.Sleep(1 * time.Second)
      	// Close channels to clean up resources
	close(observer1.NotificationChannel)
	close(observer2.NotificationChannel)
}

// package main

// import (
// 	"fmt"
// 	"time"
// )

// func main() {
// 	ch := make(chan string)

// 	// Start receiver first
// 	go func() {
// 		msg := <-ch // Waits here (blocks)
// 		fmt.Println("Received:", msg)
// 	}()

// 	time.Sleep(2 * time.Second) // Simulate delay before sending

// 	// Now send the message
// 	ch <- "Hello after 2 seconds!"

// 	time.Sleep(1 * time.Second)
// }
