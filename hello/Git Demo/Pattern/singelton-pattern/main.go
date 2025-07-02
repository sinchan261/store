package main

import( "sync"
 "fmt"
)

type Singleton struct {
	value int
}

var Instance *Singleton
var Once sync.Once

func GetInstance() *Singleton{
Once.Do(func(){
	Instance=&Singleton{
		value:89,
	}
	
})
return Instance
}
func main() {
 s1:=GetInstance();
 fmt.Printf("singleton instance s1:%d",s1);
 s2:=GetInstance();
 fmt.Printf("singleton instance s2: %d",s2);

}