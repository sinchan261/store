package main

import (
	"fmt"

)
 type  car interface{
	startengine()string
	drive() string
 }
 type sedan struct{
brand string
length int
 }
 type drive struct{
	brand string
	height int
 }
 func (s sedan) startengine()string{
	return fmt.Sprintf("hello"+s.brand)
 }
 func (s sedan) drive()string{
	return fmt.Sprintf("hello",s.length)
 }
 func (d drive) drive()string{
	return fmt.Sprintf("jeep")
 }
  func (d drive) startengine()string{
	return fmt.Sprintf("jeep car")
 }
func send(s car)string{
	cd:=s.drive();
	cd1:=s.startengine();
	return cd+cd1
}






func process(inter interface{}){
	
	switch day:=inter.(type){
case int: 
fmt.Println("it was int",day)
case string:
	fmt.Println("it was string",day)
default:
	fmt.Println("another type is located")
}
}
func check(cd interface{}){
	switch v:=cd.(type){
	case sedan:
		fmt.Println("sedan",v.brand)
	case drive:
		fmt.Println("drive",v.drive())
	}
}
 func main(){
var inter interface{}
inter=32
process(inter)



  var s sedan=sedan{
	brand:"audi",
	length:929,
  }
fmt.Println(s.startengine())
fmt.Println(send(s));

var data map[string]interface{}=make(map[string]interface{});

data["name"]="saikat"
data["age"]=8393
data["skills"]=[]string{"474","484"}
fmt.Println(data["age"].(int))
fmt.Println(data["skills"].([]string))
var cd interface{};
cd=sedan{brand:"maruti",length:595}
cd=drive{brand:"jeep",height:8949}
check(cd)
 }

 // Online Go compiler to run Golang program online
// Print "Try programiz.pro" message

package main
import "fmt"
func solve( inter interface{}){
    switch v:=inter.(type){
        case int:
        fmt.Println("int type",v)
        case string:
        fmt.Println("string type",v);
    }
}
func solve2(newmap map[string]interface{}){
    for _,d:=range(newmap){
    switch v:=d.(type){
        case int:
        fmt.Println(v);
        case string:
        fmt.Println(v);
        default:
        fmt.Println("error")
    }
        
    }
}
func main() {
    var inter interface{}
    var newMap map[string]interface{}=map[string]interface{}{
        "saikat":637,
        "sinchan":"ghosh",
        "school":true,
    }
    var ne map[string]map[string]interface{}=map[string]map[string]interface{}{
        "saikat":{
            "ghosh":728,
            "kl":true,
        },
    }

    fmt.Println(newMap)
    solve2(newMap);
    inter=32;
    solve(inter);
 for outerKey, innerMap := range ne {
        fmt.Println("Outer Key:", outerKey)

        // Loop through the inner map
        for innerKey, value := range innerMap {
            fmt.Printf("  Inner Key: %s → Value: %v\n", innerKey, value)

            // Optional: use type assertion
            switch v := value.(type) {
            case int:
                fmt.Println("    Type: int, Value doubled:", v*2)
            case bool:
                fmt.Println("    Type: bool, Negated:", !v)
            case string:
                fmt.Println("    Type: string, Uppercase:", v)
            default:
                fmt.Println("    Unknown type")
            }
        }
    }
}