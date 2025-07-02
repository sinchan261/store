const mongoose=require("mongoose");
const PostSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        
    },
    images: {
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
    },
    
},{timestamps:true})
const post =mongoose.model("post-part",PostSchema );
module.exports=post