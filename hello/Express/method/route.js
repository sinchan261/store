
const express=require('express')
const app=express();
const Router=express.Router()
Router.route('/about').get((req,res)=>{
    res.send('you want to get something')
}).delete((req,res)=>{
    res.send('you want to delete something')
})
Router.route('/user').get((req,res)=>{
    res.send('you are in user page')
})

module.exports=Router