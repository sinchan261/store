const express=require('express')
require("dotenv").config();
const app=express();
const port=process.env.PORT||4000
app.get("/",(req,res)=>{
    return res.json({message:"hey i am nodejs in container"})
})
app.listen(port,()=>{
    console.log('app is running on this port')
})