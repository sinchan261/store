const mongoose = require('mongoose');
const Post=require('../model/server')
const showCreateForm=(req,res)=>{
    res.render("createpost");
}
 const show_post=async (req, res) => {
    const posts = await Post.find();
    res.render("list", { posts });
  }
  //create post logic
  const create_post_logic=async (req, res) => {
    try {
      const { title, content, author } = req.body;
      await Post.create({ title, content, author });
      res.redirect("/list");
    } catch (error) {
      res.status(500).send("Error creating post. Please try again.");
    }
  }
module.exports={
    showCreateForm,
    show_post,
    create_post_logic
}