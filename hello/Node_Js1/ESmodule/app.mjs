//import greet from "./utills.mjs"
//console.log(greet())
/*import {add,sub} from "./utills.mjs"
console.log(add(4,5))
console.log(sub(6,8))*/
/*import greet,{add,sub} from "./utills.mjs"
console.log(greet("saikat"))*/

//!Import everything
import *as utill from "./utills.mjs"
console.log(utill.default("saikat"))
console.log(utill.add(4,7))
