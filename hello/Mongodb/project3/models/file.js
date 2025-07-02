const mongoose=require("mongoose");
const fileschema=new mongoose.Schema({
   url:{
        type:String,
       required:true,
       trim:true,
    },
   public_id:{
        type:String,
        required:true,
    },
    uploaded_by:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
     ref:"user"
    },
    
 },{
    timestamps:true
});
const file=mongoose.model("file",fileschema)
module.exports=file