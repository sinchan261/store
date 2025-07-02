const express=require('express')
const port=5000||process.env.port
const mongoose=require("mongoose")

//instance of express
const app=express()
const url="mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";
//connect to mongodb
const connectdb=async()=>{
    try{
        await mongoose.connect(url)
        console.log("mongodb successfully connected")
    }
    catch(error){
        console.log(error)
    }
}
connectdb()
//start the server
app.listen(port,()=>{
    console.log("server started running ")
})