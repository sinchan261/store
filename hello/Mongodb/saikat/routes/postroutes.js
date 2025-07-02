const express=require("express");
const { getpostform, createpost, getposts, getpostbyid, getEditpostform, updatepost, deletepost } = require("../controllers/postcontroller");
const upload = require("../config/multer");
const { ensureAuthenticated } = require("../middlewares/auth");
const { updatecomment } = require("../controllers/commentcontroller");
const postrouter=express.Router()
postrouter.use(express.urlencoded({ extended: true }))

// ensureAuthenticated
// createpost
const store=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/auth/login");
}
postrouter.get("/add",store,getpostform)

//!post logic
postrouter.post("/add",ensureAuthenticated,upload.array("images",5),createpost);
postrouter.get("/",getposts)
//get post by id
postrouter.get("/:id",(req,res,next)=>{
   
    next();
},getpostbyid)
postrouter.get("/:id/edit",getEditpostform)
postrouter.put("/:id",ensureAuthenticated,upload.array("images",5),updatepost)
//detelete post
postrouter.delete("/:id",ensureAuthenticated,deletepost)

 module.exports = postrouter; 

