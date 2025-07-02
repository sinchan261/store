const express=require('express');
const app=express();
const port=3000;
const axios=require("axios");
app.get('/posts',async(req,res,next)=>{
    try{
        const response=await axios.get('https://jsoplaceholder.typicode.com/posts')
    res.json(response.data)
    }
    catch(error){
     next(error)
    }
})
//simulate an in the middleware
// app.use((req,res,next)=>{
// const iserror=false;
// try{
//     if(iserror)
//    { throw new Error('synchronus error occured')}
// next()
// }
// catch(error){
//     next(error)
// }
// })
//regulare route

app.get('/',(req,res)=>{
    res.json({
        message:"welcome to built in error handler"
    })
})
//custom error handeling middleaware
app.use((err,req,res,next)=>{//always bring your error handeling middleware below all your regulare route
//here error contains err which is being passed by previous error
console.log(err.response);
console.log(err.request);
if(err.response){
    res.status(err.response.status).json(err.response.data)
}

else if(err.request){
    res.status(500).json({message:"service unavailabel"})
}
else{
    res.status(500).json({message:'something broke'})
}
})
//start the server
app.listen(port,console.log(`server is running`))