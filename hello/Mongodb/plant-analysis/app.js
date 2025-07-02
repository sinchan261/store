require("dotenv").config()
const express=require("express");
const app=express()
const multer=require("multer");
const pdfkit=require("pdfkit");
const fs=require("fs");
const fsPromise=fs.promises;
const path=require("path")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const port=process.env.PORT||3000
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"30mb"}))
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./upload");
    },
    filename:(req,file,cb)=>{
        cb(null,Math.floor(Math.random()*100)+file.originalname)
    }
})
app.use(express.static("public"))
app.set('view engine', 'ejs');
const upload=multer({storage:storage})
//initialize Google Generative ai
const genAI = new GoogleGenerativeAI(process.env.api_key);

app.get("/analyze",(req,res)=>{
  
    res.render("index")
    
})
app.post("/analyze",upload.single("file1"),async(req,res)=>{
    const file=req.file;
    console.log(file)

    try{
        if(!req.file){
            return res.status(400).json({error:"please upload an image"})
        }
         const imagepath=req.file.path;
         const imagedata=await fsPromise.readFile(imagepath,{
            encoding:"base64"
         })
 console.log(imagedata)
         //use the gemini api to analyze the image
         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
         const prompt = "Explain how AI works";
         const result=await model.generateContent(["Analyze this  image and providedetailed analysis of its species,health, and care recommendations,its characteristics,care instructions,and any interesting ftruncateSync,please provide the response in plain text without using any markdown formatting",
          ,{
            inlineData:{
                mimeType:req.file.mimetype,
                 data:imagedata
            }
          }  ]);
          const plantinfo=result.response.text()
          await fsPromise.unlink(imagepath)
          res.json({success:true,plantinfo})
         console.log(plantinfo);

    }catch(error){

    }
})
app.post("/download",async(req,res)=>{
    res.json({success:true})
})

//start the server
app.listen(port,()=>{
    console.log('app is running',port)
})


// require("dotenv").config();
// const express = require("express");
// const multer = require("multer");
// const pdfkit = require("pdfkit");
// const fs = require("fs");
// const fsPromise = fs.promises;
// const path = require("path");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ limit: "30mb" }));
// app.use(express.static("public"));
// app.set("view engine", "ejs");

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./upload");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Math.floor(Math.random() * 100) + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Initialize Google Generative AI
// const genAI = new GoogleGenerativeAI(process.env.api_key);

// app.get("/analyze", (req, res) => {
//   res.render("first");
// });

// app.post("/analyze", upload.single("file1"), async (req, res) => {
//   try {
//     const file = req.file;

//     // Validate file
//     if (!file) {
//       return res.status(400).json({ error: "Please upload an image" });
//     }

//     const imagePath = file.path;

//     // Read file as base64
//     const imageData = await fsPromise.readFile(imagePath, { encoding: "base64" });

//     console.log("Image Data Base64 Length:", imageData.length);

//     // Use the Generative AI API
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const prompt =
//       "Analyze this image and provide detailed analysis of its species, health, care recommendations, its characteristics, care instructions, and any interesting facts. Please provide the response in plain text without using any markdown formatting.";

//     const result = await model.generateContent(
//       [prompt],
//       {
//         inlineData: {
//           mimeType: file.mimetype,
//           data: imageData,
//         },
//       }
//     );

//     const plantInfo = result.response.text(); // Adjust if response format is different

//     // Clean up uploaded image
//     await fsPromise.unlink(imagePath);

//     res.json({ success: true, plantInfo });
//     console.log(plantInfo);
//   } catch (error) {
//     console.error("Error in analyzing the image:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.post("/download", async (req, res) => {
//   res.json({ success: true });
// });

// // Start the server
// app.listen(port, () => {
//   console.log("App is running on port", port);
// });
