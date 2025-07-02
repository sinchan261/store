const mongoose=require("mongoose");
//schema--
const User_schema=new mongoose.Schema({
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
    profilepicture:{
        type:String,
        public_id:String,
    }
    ,bio:{
        type:String,

    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }],
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]

},{
    timestamps:true
})
const User=mongoose.model("User",User_schema);
module.exports = User;  // Direct export of User model
