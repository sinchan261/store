const asyncHandler = require("express-async-handler");
const user = require("../models/user");
const post = require("../models/post");
const files = require("../models/file");
const cloudinary = require("../config/cloudinary");
const comment = require("../models/comment");

//get user profile
exports.getuserprofile=asyncHandler(async(req,res)=>{
     const users=await user.findById(req.user._id).select("password");
     if(!users){
        return res.render("login",{
            title:"Login",
            user:req.user,
            error:"user not found",
        })
     }
     //fetch users post;
     const postv=await post.find({author:req.user._id}).sort({
        createdAt:-1
     })

   res.render("profile",{
    title:"profile",
    user:req.user,
    posts:postv,
    error:"",
    postcount:postv.length,
   });
}) 

// get edit profile form
exports.geteditform=asyncHandler(async(req,res)=>{
  const userv=await user.findById(req.user._id).select("-password")
  if(!user){
    return res.render("login",{
        title:"login",
        user:userv,
        error:"user not found",
    })
  }
  res.render("editprofile",{
    title:"edit profile",
    user:userv,
    error:"user not found"
  })
})

//update profile
exports.update_profile=asyncHandler(async(req,res)=>{
 const{username,email,bio}=req.body;
 const postv=await post.find({author:req.user._id})
 const userv=await user.findById(req.user._id).select("-password");
 if(!userv){
    return res.render("login",{
        title:"login",
        user:req.user,
        error:"user not found",
    })
 }
 userv.username=username||userv.username;
 userv.bio=bio|| userv.bio;
 userv.email=email|| userv.email;
 
 
 if(req.file){
    if(userv.profile_pic&&userv.profile_pic.public_id){
        await cloudinary.uploader.destroy(userv.profile_pic.public_id)
        console.log("hello")
    }
 }


 const file=await files({
    url:req.file.path,
    public_id:req.file.filename,
    uploaded_by:req.user._id
})

await file.save();
userv.profile_pic={
    url:file.url,
    public_id:file.public_id
};
console.log(userv)
 await userv.save();
//  res.render("profile",{
//     title:"profile",
//     user:req.user,
//     posts:postv,
//     error:"",
//     postcount:postv.length,
//    });


 res.render("profile",{
    title:"profile",
    user:userv,
    error:"",
    posts:postv,
    postcount:postv.length,
 });

})
//delete profile
exports.deleteuser=asyncHandler(async(req,res)=>{
    const userv=await user.findById(req.user._id);
    if(!userv){
        res.render("login",{
            title:"login",
            user: req.user,
            error:"user not found"
        })
    }
    //delete users profile picture from cloudinary
    if(userv.profile_pic&&userv.profile_pic.public_id){
        await cloudinary.uploader.destroy(userv.profile_pic.public_id)
    }
  //delete all posts created by the user and their associated images and comments\
    const posts=await post.find({author:req.user._id})
    for(const postv of posts){
        for(const imagev of postv.images){
            await cloudinary.uploader.destroy(imagev.public_id)
        }

        await comment.deleteMany({post:postv._id})

        await post.findByIdAndDelete(postv._id)
    }
    //delete the all comments made by the user
    await comment.deleteMany({author:req.user._id})
    //delete all files uploaded by the user
    const filev=await files.find({
        uploaded_by:req.user._id
    });
     for(const file of filev){
        await cloudinary.uploader.destroy(file.public_id)
     }
     await user.findByIdAndDelete(req.user._id);
     res.redirect("/auth/register")
})