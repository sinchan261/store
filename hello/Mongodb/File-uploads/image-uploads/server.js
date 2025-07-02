require("dotenv").config()
console.log('Cloudinary Config:', {
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
});
const express = require('express');

const mongoose=require("mongoose");

const multer = require("multer");//this is helps us to access value from env file
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // Corrected to CloudinaryStorage
const app = express();
const url="mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";
//const url="mongodb://localhost:27017image/"
mongoose.connect(url).then((e)=>{
    console.log("mongodb connected")
}).catch((e)=>{
    console.log("mongodb disconnected")
})
const port = 5000;
//image schema
const imageschema=new mongoose.Schema({
    url:String,
    public_id:String,

});
const image=mongoose.model('image',imageschema)
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images-folder',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.fieldname + '_' + Date.now(), // Corrected fieldname usage
        transformation: [
            {
                width: 800,
                height: 600,
                crop: "fill"
            }
        ]
    }
});

// Configure Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Fixed syntax error
        } else {
            cb(new Error('Not an image! Please upload an image.'), false); // Fixed error handling
        }
    }
});
app.post("/upload",upload.single("file"),async(req,res)=>{
    console.log(req.file);
    const upload=await image.create({
        url:req.file.path,
        public_id:req.file.filename
    })
    res.json({message:"file uploaded",upload})
})
//download npm i dotenv
//get all images
app.get('/images',async(req,res)=>{
    try{
        const images=await image.find();
        res.json({images});
    }
    catch(error){
        req.json(error)
    }
})
// Start the server
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`); // Fixed the false argument in console.log
});
