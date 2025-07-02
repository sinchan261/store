package main
import(
	"fmt"
)
type rectangle struct{
	width int
	length int
}
func( r *rectangle) add(x,y int)(int,int){
	r.width=r.width*x;
	r.length=r.length*y
	return r.width,r.length
}

func main(){
var cd rectangle=rectangle{
	width:10,
	length:839,
}
fmt.Println(cd.add(83,49));
fmt.Println(cd.width,cd.length)
}