const asyncHandler = require("express-async-handler");
const files = require("../models/file");
const post = require("../models/post");
const express = require("express");
const cloudinary = require("../config/cloudinary");
const app = express();
app.use(express.urlencoded({ extended: true }));
//rendering postform

exports.getpostform = asyncHandler((req, res) => {
  res.render("newpost", {
    title: "create post",
    user: req.user,
    error: null,
    success: "",
  });
});
//creating a new post
exports.createpost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  //console.log(req.files)
  // const newpost=await post.create({
  //      title,
  //      content,
  //      author:req.user._id
  // })
  // if(!req.files||req.files.length===0){
  //   return res.render("newpost",{
  //     title:"create post",
  //     user:req.user,
  //     error:"At least one image is required",
  //     success:""
  //   })

  // }
  console.log("error locate1");
  const images = await Promise.all(
    req.files.map(async (file) => {
      // console.log(file)
      const newfile = new files({
        url: file.path,
        public_id: file.filename,
        uploaded_by: req.user._id,
      });
      await newfile.save();
      console.log("error locate2");
      return {
        url: newfile.url,
        public_id: newfile.public_id,
      };
    })
  );

  const newpost = new post({
    title,
    content,
    author: req.user._id,
    images,
  });
  await newpost.save();
  res.render("newpost", {
    title: "create post",
    user: req.user,
    success: "post created successfully",
    error: "",
  });
});

//get all posts
exports.getposts = asyncHandler(async (req, res) => {
  const posts = await post.find().populate("author", "username");
  // console.log(posts)
  res.render("posts", {
    title: "posts",
    posts,
    user: req.user,
    success: "",
    error: "",
  });
});
exports.getpostbyid = asyncHandler(async (req, res) => {

  const postv = await post
    .findById(req.params.id)
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "user",
        select: "username",
      },
    });

  res.render("postdetails", {
    title: "post",
    post: postv,
    user: req.user,
    success: "",
    error: "",
  });
});

//get edit post form
exports.getEditpostform = asyncHandler(async (req, res) => {
  const postv = await post.findById(req.params.id);
  if (!postv) {
    return res.render("postdetails", {
      title: "post",
      post: postv,
      user: req.user,
      error: "post not found",
      success: "",
    });
  }
  res.render("editpost", {
    title: "edit post",
    post: postv,
    user: req.user,
    error: "",
    success: "",
  });
});

//update the post
exports.updatepost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  // console.log(req.body)
  //find the post
  const postv = await post.findById(req.params.id);
  if (!postv) {
    return res.render("postdetails", {
      title: "post",
      post: postv,
      user: req.user,
      error: "post not found",
      success: "",
    });
  }

  if (postv.author.toString() !== req.user._id.toString()) {
    return res.render("postdetails", {
      title: "post",
      post: postv,
      user: req.user,
      error: "you are not authorized to edit this post",
      success: "",
    });
  }

  postv.title = title || postv.title;
  postv.content = content || postv.content;
  //  console.log(postv);

  //  console.log(req.files)
  await postv.save();
  if (req.files) {
    await Promise.all(
      postv.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
        //  console.log(image.public_id)
      })
    );
  }
  postv.images = await Promise.all(
    req.files.map(async (file) => {
      const newfile = new files({
        url: file.path,
        public_id: file.filename,
        uploaded_by: req.user._id,
      });
      await newfile.save();
      return {
        url: newfile.url,
        public_id: newfile.public_id,
      };
    })
  );
  await postv.save();
  
  res.redirect(`/posts/${postv._id}`);
});

//delete post
exports.deletepost=asyncHandler(async(req,res)=>{
   const postv=await post.findById(req.params.id)
    if(!postv){
      return res.render("postdetails",{
        title:"post",
        post,
        user:req.user,
        error:"post not found",
        success:"",
      })
    }

    if(postv.author.toString()!==req.user._id.toString()){
      return res.render("postdetails",{
        title:"post",
        post:postv,
        user:req.user,
        error:"you are not authorized to delete this post",
        success:""
      })
    }

    await Promise.all(
      postv.images.map(async(image)=>{
        await cloudinary.uploader.destroy(image.public_id)
      })
    )
    await post.findByIdAndDelete(req.params.id);
    res.redirect("/posts")
})