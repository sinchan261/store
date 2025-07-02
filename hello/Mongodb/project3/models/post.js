const mongoose=require("mongoose");
const postschema=new mongoose.Schema({
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
     ref:"user"
    },
    

   images:[
    {
      url:{
        type:String,
        required:true
      },
      public_id:{
        type:String,
        required:true
      },
    }],
    Comments:[
      {  type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
      }
    ]
},{
    timestamps:true
});
const post =mongoose.model("post",postschema)
module.exports=post