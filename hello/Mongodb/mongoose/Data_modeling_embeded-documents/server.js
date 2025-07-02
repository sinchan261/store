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
//!address schema
const address_Schema=new Schema({
    street:String,
    city:String,
    state:String,
    zip:Number

},{timestamp:true})
//!userschema
const userSchema=new Schema({
    name:String,
    email:String,
    state:String,
    address:address_Schema//Embedded documents

})
//compile the user schema
const user=mongoose.model("embedded",userSchema);
const createUser=async()=>{
    try{
        //create user
        const newuser=await user.create({
            name:"saikat",
            email:"gsaikat261@gmail.com",
            state:"west bengal",
            address:{
                street:"dadpur,daspur",
                state:"ghatal",
                zip:721211,
            }

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