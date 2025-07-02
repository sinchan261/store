const mongoose=require("mongoose");
const commentschema=new mongoose.Schema({
   url:{
        type:String,
       required:true,
       trim:true,
    },
 post:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"post"
    },
    author:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
     ref:"user"
    },
    
 },{
    timestamps:true
});
const comment=mongoose.model("file",commentschema)
module.exports=comment