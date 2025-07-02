const express=require('express');
const mongoose = require('mongoose');
const postrouter=express.Router();
const { showCreateForm,show_post,create_post_logic}=require('../controllers/postcontrollers.js')
//---Post model
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
  });
 // const Post = mongoose.model("Post", postSchema);
  
//! Show the create form
postrouter.get("/create",showCreateForm);
  //! To get all posts
postrouter.get("/list",show_post);
  //! Create the post (The main logic)
  postrouter.post("/create",create_post_logic);
  module.exports=postrouter