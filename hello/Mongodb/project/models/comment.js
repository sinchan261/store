const mongoose=require("mongoose");
//schema--
const Comment_schema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Post"
       
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
   
  
 

},{
    timestamps:true
})
const Comment=mongoose.model("Comment",Comment_schema);
module.exports=Comment