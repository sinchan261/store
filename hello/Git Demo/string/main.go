package main

import (
	"fmt"
	
)

func main() {
 var a_01 string="sa ik at !🥲🥲"
//  fmt.Println(a_01)
//  var a2 string="sinchan"
//  var a3 string=a_01+" "+a2
//  fmt.Println(string(a3[8]))
//  var a4 rune='h'
//  fmt.Println(a4)
 var a5b[]rune=[]rune(a_01)
 fmt.Println(len(a5b))
  fmt.Println(len(a_01))
//  fmt.Println(string(a5b))
// var a6 []byte=[]byte(a_01)
// fmt.Println(a6)
for i,c :=range a_01{
fmt.Printf("string character %c ,and index %d with ascii unicode value %v\n",c,i,c)

}
fmt.Println("this is conversion")
for i,c :=range a5b{
fmt.Printf("Rune character %c ,and index %d with ascii unicode value %U\n",c,i,c)
}
var maph map[string]map[string]int=map[string]map[string]int{
	"alice":{
		"saikat":920,
		"sinchan":939,
	},
	"bob":{
		"saikat":930,
	},
}

fmt.Println(maph)

}
