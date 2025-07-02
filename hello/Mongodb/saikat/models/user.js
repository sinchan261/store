const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
     username:{
        type:String,
        required:true,
        trim:true
     },
     email:{
        type:String,
        required:true,
        trim:true,

     },
     password:{
        type:String,
        required:true,
      
     },
   //   profile_pic:{
   //      type:String,
   //      public_id:String,
   //      url:String
   //   },
   profile_pic: {
      public_id: { type: String },
      url: { type: String },
    },
     bio:{
        type:String,
        max:50
     }
     ,
     posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
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
const user=mongoose.model("user",userSchema);
module.exports=user;
