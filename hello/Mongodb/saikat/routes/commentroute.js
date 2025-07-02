const express=require("express");
const { ensureAuthenticated } = require("../middlewares/auth");
const { addcomment, getcommentform, updatecomment, deletecomment } = require("../controllers/commentcontroller");
const commentroutes=express.Router();

commentroutes.use(express.urlencoded({ extended: true }));

//add comment 
commentroutes.post("/post/:id/comment",ensureAuthenticated,addcomment);
commentroutes.get('/comments/:id/edit',getcommentform)
//update comments
commentroutes.put("/comments/:id",(req,res,next)=>{
    console.log("done")
    next()
},ensureAuthenticated,updatecomment)
commentroutes.delete("/comments/:id",(req,res,next)=>{
    console.log("done")
    next()
},ensureAuthenticated,deletecomment)
module.exports=commentroutes