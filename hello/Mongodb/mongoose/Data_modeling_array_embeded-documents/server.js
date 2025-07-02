const express=require('express')
const port=5000||process.env.port
const mongoose=require("mongoose")
const {Schema}=mongoose;
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
//!students schema
const students_Schema=new Schema({
    name:String,
    age:String,
    grade:String,
    // zip:Number

},{timestamp:true})
//!classroom schema
const classroom_Schema=new Schema({
    class_name:String,
    
    students:[students_Schema]//Embedded documents

})
//compile the user schema
const classroom=mongoose.model("classroom",classroom_Schema);
const createUser=async()=>{
    try{
        //create user
        const newuser=await classroom.create({
           
            class_name:"math",
            students:[
                {name:'alice',age:18,grade:"a"},
                {name:"mainak",age:24,grade:"A+"},
                {name:"saikat",grade:"b",age:19}
            ]
            //this is a array of students this array indicates single documents 
            //if you want  to create more students we are going to have one more
            //and then one more as that

        })
        console.log(newuser)
console.log("successfully created")
    }
    catch(error){
        console.log(error)
    }   
}
createUser()
//start the server
app.listen(port,()=>{
    console.log("server started running ")
})