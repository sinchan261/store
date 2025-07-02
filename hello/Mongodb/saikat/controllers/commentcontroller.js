const asyncHandler=require("express-async-handler")
const comment = require("../models/comment");
const post = require("../models/post");


 exports.addcomment=asyncHandler(async(req,res)=>{
  const {content} =req.body;
  const postid=req.params.id;
  const postv=await post.findById(postid)
  if(!postv){
     return res.render("postdetails",{
        title:"post",
        post:postv,
        user:req.user,
        error:"post not found",
        success:""
     })
  }
  if(!content){
    return res.render("postdetails",{
        title:"post",
        post:postv,
        user:req.user,
        error:"comment cannot empty",
        success:""
    })
  }
   const comments=new comment ({
    content,
    post:postid,
    author:req.user._id
   })
   await comments.save();
   //push comment
    postv.comments.push(comments._id)
    await postv.save();

    res.redirect(`/posts/${postid}`);

})

//get comment
exports.getcommentform=asyncHandler(async(req,res)=>{
const commentv=await comment.findById(req.params.id);
if(!post){
   return res.render("postdetails",{
      title:"post",
      comment:commentv,
      error:"post not found",
      success:""
   })
}
res.render("editcomment",{
   title:"comment",
   comment:commentv,
   user:req.user,
   error:"",
   success:""
})
})

exports.updatecomment=asyncHandler(async(req,res)=>{
   const {content} =req.body;
   console.log(req.body)
   const commentv=await comment.findById(req.params.id);
    if(!commentv){
      res.render("postdetails",{
         title:"post",
         comment:commentv,
         user:req.user,
         error:"comment not found",
         success:"",
      })
    }

    if(commentv.author.toString()!==req.user._id.toString()){
      return res.render("postdetails",{
         title:"post",
         commentv:comment,
         user:req.user,
         error:"you are not authorized to edit thsis comment",
         success:""
      })
    }
  commentv.content=content||commentv.content;
  await commentv.save();
  console.log(commentv)
  res.redirect(`/posts/${commentv.post}`)

})

//delete comments
exports.deletecomment=asyncHandler(async(req,res)=>{
   const commentv=await comment.findById(req.params.id)
    if(!commentv){
      return res.render("postdetails",{
         title:"post",
         comment:commentv,
         user:req.user,
         error:"comment not found",
         success:""
      })
    }
    if(commentv.author.toString()!==req.user._id.toString()){
      return res.render("postdetails",{
         title:"post",
         comment:commentv,
         user:req.user,
         error:"you are not authorized to delete this comment",
         success:""
      })
    }
    await comment.findByIdAndDelete(req.params.id);
    res.redirect(`/posts/${commentv.post}`)
})