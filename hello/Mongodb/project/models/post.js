const mongoose=require("mongoose");
//schema--
const Post_schema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true,
       
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
   
    images:[{
       url:{
        type:"string",
        required:true,
       },
       public_id:{
        type:String,
        required:true,
       },
    }],
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]

},{
    timestamps:true
})
const Post=mongoose.model("post",Post_schema);
module.exports=Post