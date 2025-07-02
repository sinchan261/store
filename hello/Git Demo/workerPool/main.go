package main
import ("fmt"
"sync"
"time"
)
func worker (id int,jobs<-chan int,workers chan <-int,wg *sync.WaitGroup){
    defer wg.Done()
    for j:=range(jobs){
                fmt.Printf("worker %d started job %d\n", id, j)
        time.Sleep(time.Second)  // Simulating work
        fmt.Printf("worker %d finished job %d\n", id, j)
        workers<-j*2
    }
}
func main() {
    var wg sync.WaitGroup
const numjobs=5;
jobs:=make(chan int,numjobs);
results:=make(chan int,numjobs);
for w:=1;w<=5;w++{
    wg.Add(1)
    go worker(w,jobs,results,&wg)
}
for i:=1;i<=numjobs;i++{
    jobs<-i
}
close(jobs);
wg.Wait()
close(results)
for w:=1;w<=10;w++{
    fmt.Println("Result of worker is ",<-results)
}

}