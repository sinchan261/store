
require("dotenv").config()
const express=require("express");
const app=express();
const mongoose=require("mongoose")
const mongo_store=require("connect-mongo");
const PORT=process.env.PORT||3000;
const User = require("./models/User");
const session=require("express-session")
const  passport=require("passport") // Correct import statement
const userRoutes=require("./routes/authRouter")
const passport_config=require("./config/passport");
const postRoutes = require("./routes/postRoutes");
const url="mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1"
//  const {postRoutes}=require("./routes/postRoutes")
app.use(
    session({
        secret:"keyboard cat",
        resave:false,
        saveUninitialized:false,
        store:mongo_store.create({mongoUrl:url})
    })
)

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
//session middleware
passport_config(passport)
app.use(passport.initialize())
app.use(passport.session())
mongoose.connect(process.env.URL).then((e)=>{
    console.log("mongodb connected")
}).catch((e)=>{
    console.log("mongodb disconneted")
})
app.use("/auth",userRoutes)
app.use("/posts",postRoutes);
// app.use("/posts",)
app.get("/",(req,res)=>{
    res.render("home",{
        user:req.user,
        error:"",
        title:"Home"
    })
})



app.listen(PORT,((e)=>{
    console.log(`app is running on ${PORT}`)
}))