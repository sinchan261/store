const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    username:{
        type:String,
       required:true,
       trim:true,
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
    
    profilepictuure:{
        type:String,
        public_id:String,
    },
    bio:{
        type:String,
     
    },
    posts:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"post"
    }],
    Comments:[
      {  type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
      }
    ]
},{
    timestamps:true
});
const user=mongoose.model("user",userschema)
module.exports=user;