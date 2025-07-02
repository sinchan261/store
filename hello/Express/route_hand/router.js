const express=require('express');
const router=express.Router();
router.route('/user').get((req,res)=>{
    res.send('hi you are in home page')
}).delete((req,res)=>{
    res.send('you want to delete something ')
}).put((req,res)=>{
    res.send('you want to put something')
})

router.get('/user/id',(req,res)=>{
    res.send('you are in user id page')
})
module.exports=router