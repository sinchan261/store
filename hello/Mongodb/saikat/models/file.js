const mongoose=require("mongoose");
const fileSchema=new mongoose.Schema({
     url:{
        type:String,
        required:true,
        trim:true
     },
     public_id:{
        type:String,
        required:true,
        

     },
     uploaded_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
      
     },

},{
    timestamps:true
})
const files=mongoose.model("file",fileSchema);
module.exports=files;
