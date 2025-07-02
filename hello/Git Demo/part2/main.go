package main

import (
	"fmt"
	"strconv"

)

//	func swap(a,b int)( x int,y int){
//		fmt.Println(x)
//		fmt.Println(y)
//		x=a;
//		y=b;
//		return
//	}
func demogo(){
	for i:=0;i<3;i++{
		for j:=0;j<3;j++{
			if i==1 &&j==1{
				goto end
			}
			fmt.Println(i,j)
		}
	}
	end:
	fmt.Println("exit from the loop")
}
func demo()int {
	defer fmt.Println("Hello gfg1")
	defer fmt.Println("Hello gfg2")
	defer fmt.Println("Hello gfg3")
	defer fmt.Println("Hello gfg4")
	goto end
	defer fmt.Println("Hello gfg5")
	defer fmt.Println("Hello gfg1")
	defer fmt.Println("Hello gfg2")
	defer fmt.Println("Hello gfg3")
	defer fmt.Println("Hello gfg4")
	end:
	fmt.Println("hello")
	return 1;
}




var global="i am global variable"

func check(){
	var G="i am function scope"
	fmt.Println(G)
}
func main() {

	if true{
		blockvar:="hello guys"
		fmt.Println(blockvar)
	}
	
fmt.Println(global)

check()




  demogo()
	fmt.Println(demo())
	//for loop
	for i := 0; i < 5; i++ {
		fmt.Println("hello")
	}
	i := 7
	//for as while loop
	for i >= 0 {
		fmt.Println(i)
		i--
	}
	var a []int = []int{1, 2, 3, 4, 5}
	//array
	for index, value := range a {
		fmt.Println(index, value)
	}

	//if else loop
	x := 90
	if x > 5 {
		fmt.Println("x is greater than 5")
	} else if x == 5 {
		fmt.Println("x is equal with the 5")
	} else {
		fmt.Println("x is smaller than 5")
	}
	//shorthand expression
	if p, e := strconv.Atoi("1s3"); e != nil {
		fmt.Println(e)
	} else {
		fmt.Println(p)
	}
	//switch case

	day := 100
	switch day {
	case 1, 10, 100:
		fmt.Println("wow")
	case 2:
		fmt.Println("Tuesday")
		// fallthrough
	case 3:
		fmt.Println("unknown day")

	default:
		fmt.Println("please enter a valid number")
	}

	age := 25
	switch {
	case age <= 18:
		fmt.Println("you are not adult brother")
	case age <= 29:
		fmt.Println("you are adult ,study hard you have a lot of responsiveness")
	default:
		fmt.Println("enter a valid age")
	}
	var j interface{} = "hello"
	//  x := interface{}("hello")
	switch y := j.(type) {
	case string:
		fmt.Println("this is a string")
	case int:
		fmt.Println("this is a int ")
	default:
		fmt.Println("this is a untype", y)
	}

	// 	var p int;
	// 	var q int;
	// 	p,q=swap(67,45)
	// fmt.Println(p,q)
}
