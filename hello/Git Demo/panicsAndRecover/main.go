package main
import ("fmt")
 func divide(a ,b int)(result int){
	defer func(){
  if r:=recover();r!=nil{
	fmt.Println("Recovered from panic ")
	// result=0;
  }
	}()
	if b==0 {
  panic("division by zero")
	}
	return a/b
 }
func main(){
	fmt.Println(divide(18,2));
 fmt.Println(divide(4,0));
 fmt.Println(divide(4,2));
}