package main
import(
	"fmt"
)
func child(a int,b int,parent func(a,b int)int)int{
return parent(a,b)
}
func parent(a ,b int)int{
	return a+b;
}

func child2(a int,b int,add func(a,b int)int,sub func(a,b int)int)int{
	df:=add(a,b)
	bf:=sub(a,b)
	return (df+bf);
}
func add (a,b int)int{
return a+b;
}
func sub (a,b int)int{
return a-b;
}

func add1()func()int{
	var c int=3
	return func()int{
    c++;
	return c
	}
}

func squar(a int)int{
	return a*a
}
func gf(num[]int,squar func(int)int){
	for i,_:=range num{
num[i]=squar(i)
	}
	// return num
}
func greeting(lang string)func(string)string{
	switch lang{
	case "eng":return func(name string)string{
		return name+lang
	}
case "beng":return func(name string)string{
		return name+lang
	}
default:return func(name string)string{
		return name+" Undetectable language"
	}
	}
}
func message( a string)string{
return `hello ${a} good morning`
}
func brother(a string,message func(string)string)string{
 return message(a);
}
func moja(a string)func()string{
	return func()string{
		return a
	}
}
func kemon(a int)func(int)int{
	return func(b int)int{
   return b+a
	}
}
func fun()(func()int, func()int){
	var x int =0
	inc:=func()int{
		x++;
		return x
	}
	dec:=func()int{
	x-=1
		return x
	}
	return inc,dec
}
func main(){
	var m map[string]int=make(map[string]int,3)
	m=map[string]int{
		"saikat":828,
		"ghosh":829,
		"hs":281,
	}
	m["gfg"]=627
	val,isexist:=m["gfg"]
	delete(m,"ghosh")
	_,gh:=m["ghosh"];
 fmt.Println(gh)
	fmt.Println(val,isexist)
	fmt.Println(m)
	inc,dec:=fun()
	fmt.Println(inc());
	fmt.Println(dec());
		fmt.Println(dec());
		fmt.Println(inc());

	var cg func()string=moja("saikat");
fmt.Println(cg())
	fmt.Println(brother("saikat",message))
	fmt.Println()
	fmt.Println(child(2,3,parent))
	fmt.Println(child2(2,3,add,sub))
	vf:=add1();
	fmt.Println(vf())
	fmt.Println(vf())
	fmt.Println(vf())
	fmt.Println(vf())
	numbers:=make([]int,3)
	numbers=[]int{
		1,2,3,4,5,
	}
	squar(9);
	gf(numbers,squar)
	fmt.Println(numbers)


	st:=greeting("beng")
	fmt.Println(st("saikat"))

	//function closures
sd:=kemon(2);
fmt.Println(sd(83))

}