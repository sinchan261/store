const express=require("express")
const postRouter=express.Router()
postRouter.get("/",(req,res)=>{
    res.json({
        message:'all posts',
    })
})
module.exports=postRouter