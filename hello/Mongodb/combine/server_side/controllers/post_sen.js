const express=require("express");
const post = require("../models/post");
const app=express();

// const fileUpload = require("express-fileupload");
// app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
exports.getpost=((req,res)=>{
   return  res.render("post")
})
exports.sendpost=(async(req,res)=>{
//  console.log(req.body)
try{const {name,password}=req.body;
    
const postv=new post({
    name,
    password,
    images:{
       url: req.file.path,
       public_id:req.file.filename
    }
})
await postv.save();
//   console.log(req.file)
     res.status(200).send(postv);
    
    }
     catch(error){
        res.status(400).send({success:false,msg:error.meassage})
     }
    
})