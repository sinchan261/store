const multer = require("multer");
const { CloudinaryStorage }=require('multer-storage-cloudinary')
const cloudinary=require("./cloudinary.js");
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"combine-project",
        allowedFormates:["jpg","png"]
    }
});
const upload=multer({storage:storage})
module.exports=upload
