const mongoose=require("mongoose");
const commentSchema=new mongoose.Schema({
     content:{
        type:String,
        required:true,
        trim:true
     },
     post:{
      type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"post"

     },
     author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
      
     },

},{
    timestamps:true
})
const comment=mongoose.model("comment",commentSchema);
module.exports=comment;
