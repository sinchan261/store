package main
import(
	"fmt"
)
func call(arr *[5]int){
	fmt.Println(arr[0])
	(*arr)[0]=89
}
func main(){

	fmt.Println("hello users")
	var ar[5]int =[5]int{632,3,5,4,9};
	var ar1[5] int;

	call(&ar)
	
	ar1=[5]int{53,43,45,4,4}
	fmt.Println(ar)
	fmt.Println(ar1)
	var mu[2][3]int=[2][3]int{
		{2,3,4},
		{3,4,5},
	}
	fmt.Println(mu[1][2])
	var dy[]int=[]int{64,484,44}
  dy=append(dy, 636,373,383,83)
  fmt.Println("yoo",cap(dy))
  fmt.Println(dy)
  df:=make([]int,3);
  df[0]=1
  df[1]=2
  df[2]=3
  df = append(df, 87427,2494,24,4,442)
  fmt.Println(df)
    df = append(df,dy...)
  fmt.Println(df)
   fmt.Println("yoov",cap(df))
   var dg[]int= df[3:]
   fmt.Println(dg)

}