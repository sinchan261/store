const multer=require("multer");
const { CloudinaryStorage }=require('multer-storage-cloudinary')
const cloudinary=require("./cloudinary");
const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"fullstack-blog-project",//our img will be saved in this folder in cloudinary and it is 
        //acept only two type of folder one is jpg and png
        allowedFormats:["jpg","png"]
    }
});
const upload=multer({storage})
module.exports=upload