package main
import (
	"fmt"

)
func add_map(v map[int]string){
	v[1]="hello"
	v[2]="hi"
	v[3]="bye"
}
func main(){
	fmt.Println("Hello world")
	var m map[int]string=make(map[int]string)

	if m==nil{
		fmt.Println("map is empty")
	}
	m[67]="saikat"
	m[38]="sinchan"
	val,vb:=m[67]
	fmt.Println(val,vb)
	fmt.Println(m[67])
	delete(m,67)
	add_map(m)
	fmt.Println(m[1])
	// var df map[int]string=make(map[int]string)
	delete(m,1)
	
	fmt.Println(m)
}