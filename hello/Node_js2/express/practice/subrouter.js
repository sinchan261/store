const express=require("express");
const router=express.Router();
router.get('/users',(req,res)=>{
    res.json('you are in users webpage');
})
module.exports=router;