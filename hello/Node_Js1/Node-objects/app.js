//*---Accssing the Global Object
console.log(global)
global.myGlobal="Hello From The Global Object"
console.log(global)
console.log("myGlobal" in global)
console.log(__dirname)
console.log(__filename)
let count=0;
const interval=setInterval(()=>{
    console.log('hello world');
    count++
    if(count==5){
        clearInterval(interval)
    }
 
})
