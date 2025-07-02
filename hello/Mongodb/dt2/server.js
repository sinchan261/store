
const express=require("express");
const { default: mongoose } = require("mongoose");
const app=express();
mongoose.connect("mongodb+srv://gsaikat719:EAKmdPcUE7dHqdoz@change.6c0qy.mongodb.net/?retryWrites=true&w=majority&appName=Change").then(()=>{
    console.log("mongodb is connected")
}).catch((error)=>{
    console.log("mongodb is not connected")
})



//!create comment under post
const commentSchema=new mongoose.Schema({
  text:String,//embedded documents
    
    
},
{timestamps:true}
)
//compile the comment schema to form model
const comment=mongoose.model("author",commentSchema)
//!create post
const blogsschema=new mongoose.Schema({
    title:String,
   comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"comment"
   }]

},
{timestamps:true}
)
//compile the books schema
const post=mongoose.model("blog",blogsschema)
const createpost=async()=>{
    try{
         const newdoc=await post.create({
           title:"awaosome fullstack course",
         });
    }catch(error){
        console.log(error)
    }

}
// createpost();
//!create comment
const createcomment=async()=>{
      try{
//? find the post you want to comment
const postfound=await post.findById('676674ee0d041484a81072fa');
console.log(postfound)
//? create the comment
const newcomment=await comment.create({
    text:"awosome pos2"
})
//? push the comment into the post
postfound.comments.push(newcomment._id);
 await postfound.save();

      }catch(error){

      }

}
// createcomment()
app.listen(2000,()=>{
    console.log("server is running")
})