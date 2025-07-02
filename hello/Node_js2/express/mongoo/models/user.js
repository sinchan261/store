const express=require("express");
const { default: mongoose } = require("mongoose");
const app=express();
const {Schema}=mongoose;
const url="mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";
mongoose.connect(url).then((e)=>{
    console.log('mongodb connected succesfully')
}).catch((e)=>{
    console.log('mongodb is not connected successfully')
})
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,

    },
    lastname:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})
const user=mongoose.model("user",userSchema);
module.exports=user;