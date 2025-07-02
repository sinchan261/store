const express=require("express");
const app=express();

// var expressLayouts = require('express-ejs-layouts');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// app.use(expressLayouts);
const cros=require("cors");
const mongoose=require("mongoose");
const post_router = require("./routes/postroutes");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("mongodb is connected");
}).catch(()=>{
    console.log("disconnected")
})

app.use(cros({
    origin:'*'//allow for accessing this  api for all site for private https//your website number
}));

// !Home Roter
app.get("/",((req,res)=>{
    res.send("you are in home page")
}))
// !post router
app.use("/post",post_router)



app.listen(2000,()=>{
    console.log('server is running')
})