
const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config()
const port=process.env.PORT||3000;
const url="mongodb+srv://gsaikat719:J0vwyw5OnjTz3zlx@fullstack.waftj.mongodb.net/?retryWrites=true&w=majority&appName=fullstack"
mongoose.connect(url).then(()=>{
    console.log("DB is running on port ")
}).catch(()=>{
    console.log("server is not running")
})
app.listen(port,()=>{
    console.log("app is running");
})