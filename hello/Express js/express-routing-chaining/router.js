const express=require('express');
//create instance of express router
const Router=express.Router()
//using the route()
Router.route('/')
//"/" this indicates the end point of base url if i wtite there '/users' then here base url will be /:id
//!getting all user
Router.route('/').get((req,res)=>{
    res.json({
        message:'All user fetched by get method'
    })
})

//!Handel specific user id
Router.route("/:id").get((req,res)=>{
    res.json({
        message:' All user fetched using Id(Get)'
    })
}).put((req,res)=>{
    res.json({
        message:' All user are updated using put'
    })}).delete((req,res)=>{
        res.json({
            message:' All user are deleted using delete'
        })
    })


module.exports=Router