const mongoose=require("mongoose");
//schema--
const File_schema=new mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    public_id:{
        type:String,
        required:true,
       
    },
    uploaded_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
   
  
 

},{
    timestamps:true
})
const File=mongoose.model("File",File_schema);
module.exports=File