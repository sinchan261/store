package main

import (
	"fmt"
	"sync"
)
var(
	shared int
	counter int;
	mutex sync.Mutex;
	rw sync.RWMutex
)
func read( id int,wg *sync.WaitGroup ){
	defer wg.Done()
 mutex.Lock()
 counter++;
 fmt.Println(counter)
 mutex.Unlock()
}
func reader(wg *sync.WaitGroup){
	defer wg.Done()
rw.RLock()
fmt.Println("counter is now %d",shared)
rw.RUnlock();
}
func writer(wg *sync.WaitGroup){
		defer wg.Done()
rw.Lock()
fmt.Println("counter is now write operation%d",shared)
shared++;
rw.Unlock()
}
func main(){
	var wg sync.WaitGroup
for i:=range(10){
wg.Add(1);
go read(i,&wg);


}
for i:=0;i<10;i++{
	wg.Add(1)
	go reader(&wg)
}
for i:=0;i<5;i++{
	wg.Add(1)
 go writer(&wg)
}
wg.Wait()
}