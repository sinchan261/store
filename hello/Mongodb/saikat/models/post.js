const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
     title:{
        type:String,
        required:true,
        trim:true
     },
     content:{
        type:String,
        required:true,
        

     },
     author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
      
     },
    
     images:[{
        url:{
      type:String,
      required:true,},
      public_id:{
        type:String,
        required:true
      }
     }],
     comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
     ]
},{
    timestamps:true
})
const post=mongoose.model("post",postSchema);
module.exports=post;
