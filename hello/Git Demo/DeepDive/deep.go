package main
import (
	"fmt"
)
func PrintPointer(d **int){
	fmt.Println(**d)
}
type car struct{
	name string
	brand string
	service string
}

func main(){
	// var p *int;
	// var x int =10;
	// //pointer Assignment
	// p=&x;
	// PrintPointer(&p)
	type parent struct{
		mobile string
		age int
	}
	type child struct{
		name string
		parent
	}
	var fg child=child{
		"sinchan",
		parent{
"saikat",
	52,
		},
	
	}
	fmt.Println("hello jio",fg.mobile)
	var cd *car;
	cd=&car{
 "saikat",
 "sinchan",
 "ghosh",
	}
	cd.name="df"
	var cd1 *car
	cd1=&car{
 name:"saikat",
 brand:"sinchan",
 service:"ghosh",
	}
	//Dereferencing
 fmt.Println(*cd1)
 if(cd1==cd){
	fmt.Println("Hello worold come to our office")
 }else{
	fmt.Println("ooo sorry")
 }
 var sa *[]car
 sa=&[]car{
	{ name:"saikat",
 brand:"sinchan",
 service:"ghosh",},
	{ name:"saikat",
 brand:"sinchan",
 service:"ghosh",},
 }
fmt.Println((*sa)[1].name)
person:=struct{
	namev string
	age int
}{
	namev:"saikat",
	age:34,
}
fmt.Println(person)
}