package main

import (
	"fmt"
)
type car struct{
	brand string
	age int
	version string

}
func (c *car) operate(){
	c.age=8292
	fmt.Println(c.age,c.brand,c.version);
}
func add(x int ,y int)int{
return x+y
}
func sub(x int ,y int)int{
	return x-y
}
func call(a,b int,add func(int,int)int,sub func (int,int)int)func()[]int{
	 c:=add(a,b);
	d:=sub(a,b);
	var i int=0;
	var sl []int=make([]int, 1)
 return func()[]int{
	fgh:=add(c,d)+sub(c,d)
sl=append(sl,fgh)
i+=1;
c+=1;
d+=1

return sl
 }
}

func counter(a,b string)(func()string ,func()string){
	first:=func()string{
		return "hello"+" "+b
	}
	second:=func()string{
		return "saikat"+" "+a
	}
	return first,second
}
func main(){
 fmt.Println(call(9,7,add,sub))
 first,second:=counter("saikat","sinchan");
 fmt.Println(first(),second())
var cd car=car{
	"bnw",
	1,
	"v.0.2",
}
// cd.operate()

 fmt.Println(cd)
 var vf []int;
store:=call(2,4,add,sub)
vf=store()
fmt.Println(vf)
vf=store()
fmt.Println(vf)
vf=store()
fmt.Println(vf)
vf=store()
fmt.Println(vf)
vf=store()
fmt.Println(vf)
vf=store()
fmt.Println(vf)
var mak map[string]map[string]int=map[string]map[string]int{
	"saikat":{
		"sinchan":829,
	},
	"sinchan":{
		"age":920,
	},
}
mak["ghosh"]=map[string]int{
	"age":839,
}
}