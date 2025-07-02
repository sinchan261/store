package main

import (
	"fmt"
	"part/custommath"
	"strconv"

	"github.com/google/uuid"

)
func op(){
		fmt.Printf("hello saikat good morning:")
	fmt.Println(`The value is:`, custommath.Add(4, 5))
	fmt.Println("genereta a go id", uuid.New().String())

	// var a int
	// var b string
	// a=829;
	// b="saikat"
	var a = 3
	var b = "saikat"
	fmt.Println(a, b)
	//zero values\
	var i int            //0
	var fi float32       //0.0
	var bo bool          //false
	var str string       //""
	var arr [3]int       //[0,0,0]
	var slice []int      //[]
	var m map[string]int //map[]
	var ptr *int         //nil\
	fmt.Printf("Int: %d\n", i)
	fmt.Printf("fi: %f\n", fi)
	fmt.Printf("Boolean: %v\n", bo)
	fmt.Printf("string: %q\n", str)
	fmt.Printf("Array: %v\n", arr)
	fmt.Printf("slice: %v\n", slice)
	fmt.Printf("Map: %v\n", m)
	fmt.Printf("Pointer: %v\n", ptr)
	//short hand declaration
	//operatore (:=)
	//no need of var
	// var my_value string;
	// my_value="sauk"
	// var my_value string = "sauk"
	my_value := "string"
	fmt.Println(my_value)
	arra := [3]int{1, 2, 3}
	fmt.Println(arra)
	//Type conversion
	//integer to float =f:= float(i)
	//float to integer i:=int(f)
	//string to byte slice b:=[]byte(s)
	//byte slice to string s:= string(b)
	// string to int i:=strconv.Atoi(s)
	//int to string   s:=strconv.Itoa(i)
	first := 3
	second := 7.4
	fmt.Println("my float var: ", float32(first))
	fmt.Println("my float var: ", int(second))
	third := "coolString"
	fmt.Println(strconv.Atoi("third"))
	fmt.Println(strconv.Itoa(first))
	fourth := []byte{99, 111, 108}
	fmt.Println(string(fourth))
	fmt.Println([]byte(third))
	//Go constants
	//fixed values and can not changed during execution
	//used to define values of compilation time const name
	// const pi float32=3.14
	// const (
	// 	length=5
	// 	witdh=6
	// 	area=length*widthv
	// )
    
	lets := []int{1, 2, 3, 4, 5, 6}
	fmt.Println(lets)

	const(
		Length=5;
		Wid=67
		Area=Length*Wid
	)
	const (
		Apple =10<<iota
		Banana
		Cherry
	)
	fmt.Println(Cherry)

const un = 10
const piv float32 = 3.146
var piv2 float32=piv
var py int64 = int64(piv2)
fmt.Println(py)
// arithmetic operatore
p:=3
q:=4
c:=p%q
di:=float64(p)/float64(q)
fmt.Println(c)
fmt.Println(di)
//logical operation
fmt.Println(3^4)
x:=&p
fmt.Println(*x)

}
func hello(){
	fmt.Println("Hello Gfg")
}
func helloa(a,b int)int{
	fmt.Println("Hello Gfg")
	return a+b;
}

func Add(numbers ...int){
	fmt.Println(numbers)
}
func in()func() int{
count:=0;
return func()int{
	count++
	return count;
}
}


func swap(ya,ba int)(int ,int){
return ba,ya
}
func convert(str string)(int ,error){
	return strconv.Atoi(str)
}
func he(numbers ...int)[]int{
	fmt.Println(numbers)
	return numbers
}
//!main function
func main() {



fmt.Println(helloa(4,5))

hello()
Add(46,3839,7282);
greet:=func(){
	fmt.Println("hello world brother")
}
fmt.Println(convert("34"))
greet()
fmt.Println(swap(5,4))
incr:=in();
fmt.Println(incr())
fmt.Println(incr())
fmt.Println(incr())
hi:=he(6467,8585)
fmt.Println((hi))
}
