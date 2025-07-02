const express=require('express');
const Router=express.Router()

//!getting all user
Router.get('/users',(req,res)=>{
    res.json({
        message:'All user fetched+'
    })
})
//!getting a user
Router.get('/users/:id',(req,res)=>{
    res.json({
        message:' user fetched'
    })
})
//!update a user
Router.put('/users/:id',(req,res)=>{
    res.json({
        message:' user updated'
    })
})
//!delete a user
Router.delete('/users/:id',(req,res)=>{
    res.json({
        message:' user deleted'
    })
})

module.exports=Router