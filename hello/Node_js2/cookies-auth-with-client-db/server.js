const express=require("express");
const bcrypt = require('bcrypt');
const app=express();
const jwt=require('jsonwebtoken')
const cookieparser=require("cookie-parser");
const mongoose=require("mongoose")
const port=3000;
const url="mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";
mongoose.connect(url).then((e)=>{
    console.log("mongodb connected")
}).catch((e)=>{
    console.log("mongodb disconnectd")
})
app.use(express.urlencoded({extended:true}));
const userschema=new mongoose.Schema({
    username:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }
})
const user=mongoose.model('newuser',userschema);
app.set("view engine","ejs");
app.use(cookieparser());

//home route
app.get("/",(req,res)=>{
    res.render("home")
})
//login get route
app.get("/login",(req,res)=>{
    res.render("login");
})
//login post method
// app.post("/login",async(req,res)=>{
//     const {username,password}=req.body;
//     const userfound=await user.findOne({password});
//     if(userfound ){

//     }
// })
app.get("/register",(req,res)=>{
    res.render("register");
})
//after register 
app.post("/register",async(req,res)=>{
    console.log(req.body);
    const {username,password}=req.body;
    const search=await user.findOne({username});
    console.log(search);
    if(search){
      console.log("user exists");
      res.send("User Already exists go to Login page")
    }
    else{
        console.log("created successfully")
        const hased=await bcrypt.hash(password,10);
        const cre=await user.create({
            username:username,
            password:hased
        })
        // await cre.save()
    }
    res.redirect("login")
})
//login page
app.post("/login", async (req, res) => {
    const existing_token = req.cookies.token;
    if (existing_token) {
        try {
            const decoded = jwt.verify(existing_token, "anykey");
            req.userdata = decoded;
            return res.redirect("/dashboard");
        } catch (err) {
            console.log("Existing token is expired. Please log in again.");
        }
    }

    const { username, password } = req.body;
    const userfound = await user.findOne({ username });
    if (userfound && await bcrypt.compare(password, userfound.password)) {
        const token = jwt.sign({
            username: userfound.username,
            role: userfound.role,
            issuedAt: Date.now(),
        }, 'anykey', {
            expiresIn: "6h"
        });
        res.cookie("token", token, {
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
            httpOnly: true,
            secure: true, // Ensure this in production (requires HTTPS)
            sameSite: 'strict' // Helps prevent CSRF attacks
        });
        res.redirect("/dashboard");
    } else {
        res.send("Invalid credentials");
    }
});

const isauthen = (req, res, next) => {
    const token = req.cookies.token || null;
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, 'anykey', (err, decoded) => {
        if (err) {
            return res.redirect("/login");
        }
        req.userdata = decoded;
        console.log("Token issued at:", new Date(decoded.issuedAt));
        next();
    });
};

app.get("/dashboard",isauthen,(req,res)=>{
    const user2=req.userdata?req.userdata.username:null;
   
    res.render("dashboard",{user:user2});
})
app.get('/logout',(req,res)=>{
    res.clearCookie("token")
    res.redirect('/login');
})

app.listen(port,()=>{
    console.log("server is running");
})
