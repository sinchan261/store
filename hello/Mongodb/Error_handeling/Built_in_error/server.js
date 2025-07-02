const express=require('express');
const app=express();
const port=3000;
//simulate an in the middleware
app.use((req,res,next)=>{
const iserror=true;
console.log("i will always be called");
if(iserror){
    const err=new Error('an error occured');
    next(err)
}
else{
    next();
}
})
//regulare route
app.get('/',(req,res)=>{
    res.json({
        message:"welcome to built in error handler"
    })
})
//custom error handeling middleaware
app.use((err,req,res,next)=>{//always bring your error handeling middleware below all your regulare route
//here error contains err which is being passed by previous error
res.status(err.status||500)
console.error(err.stack)
res.json({
    message:'something happend',
    stack:err.stack
})
console.log(err)
})
//start the server
app.listen(port,console.log(`server is running`))