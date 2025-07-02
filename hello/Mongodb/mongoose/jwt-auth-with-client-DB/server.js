
const express = require('express');
const app = express();
const path = require('path');
const jwt=require('jsonwebtoken')
const cookieparser = require('cookie-parser');
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
app.use(express.json())

// This middleware is used to parse incoming requests with a URL-encoded payload.
// URL-encoded data is the way browsers send form data in HTML forms. 
// When setting the extended option to true, it allows the middleware to parse extended syntax, 
// allowing rich objects and arrays to be URL-encoded into the query string.
// This setting is important when receiving data from the HTML form, which we are going to use.
//connect to mongoose

const url="mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";
mongoose.connect(url).then((e)=>{
    console.log('db has been created');
}).catch((e)=>{
    console.log('db has not been created')
})
//!create user schema
const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }
})
const user=mongoose.model('user',userSchema)

//! Set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieparser()); //if i not write this then browser cannot pass the token int the cookie to the server for verification
// This middleware parses the incoming request cookies and populates them into req.cookies.
// It allows the application to easily extract the cookie data sent by the client browser, which can be used for various purposes like user authentication.
app.use(express.urlencoded({ extended: true })); 
//*--custome middleware--/

//! isAuthenticated (Authentication )
const isauthenticated = (req, res, next) => {
  //access the token from req.cookies
  //as sooon as the users logs in ,we have acess to the token in the cookie
  const token=req.cookies? req.cookies.token:null;
  //we do not have one then we can redirect or see something that you are not logged in
  if(!token){
    return res.redirect("/login");
  }
  //verify the token as token
  jwt.verify(token,'anykey',(err,decoded)=>{

//decoded is the part of payload
if(err)
    return res.redirect('/login')
req.userdata=decoded
next()
console.log(decoded)
  })//we verify the token as token,second argument is going to be the key that we used to
  //sign this token
  


};
//!is Admin middleware
const isadmin=(req,res,next)=>{

}


// Home route

app.get('/', (req, res) => {
    res.render('home');
});

// Login route (login form)
app.get('/login', (req, res) => {
    res.render('login');
});
//Admin route
app.get('/admin-only', isauthenticated,isadmin,(req, res) => {
    //we have access to the login as req.userdata
    console.log(req.userdata);
    res.render('admin');
});
//register route
app.post('/register', async(req, res) => {
  console.log(req.body)
const {username,password}=req.body;
const hashedpassword=await bcrypt.hash(password,10);//salt is a number that's going to be used in the algorithm to hash the user password

const newuser=await user.create({
    username:username,
    password:hashedpassword
})
//install npm i bcrypt for encrypt the password
res.redirect('/login');
});
//Register logic
app.get('/register',(req, res)=>{
    res.render("register")
});

// Login route logic
app.post('/login', async(req, res) =>{ 
  const {username,password}=req.body;
const userfound=await user.findOne({
    username
})
if(userfound && await bcrypt.compare(password,userfound.password)){
//?we have created a token after successfullyy login in
    const token=jwt.sign({
    username:userfound.username,
    role:userfound.role

},'anykey',{
    expiresIn:"3d",
})//anykey-we mostely save this in this enviromental variable
console.log(token);
//save the token into the cookie ,and one advantage is this
//is more secure and anytime you want to make any request ,the browser
//will send back the token for us automatiaclly ,without us manually passing the token

    res.cookie("token",token,{
        maxAge:3*24*60*60*1000,
        httpOnly:true,
    })
    console.log(token);
    console.log(req.cookies);
        
        res.redirect('/dashboard');
}


     else {
        res.send("invalid login credentials"); // when displaying an error about a user account ,do not try to be more specefic by saying that password is not correct or username is incorrect
    }
});

// Dashboard
app.get('/dashboard',isauthenticated, (req, res) => {
    console.log(req.userdata);
    //take the login user from req obj
    const username=req.userdata? req.userdata.username:null;
    if(username)
        res.render('dashboard',{username})
    else
    res.redirect("/login")
});

//? Logout route
app.get("/logout",(req,res)=>{
    //!Logout 
    res.clearCookie('userdata');
    res.redirect("/login");
})
// app.post('/logout', (req, res) => {
//     res.clearCookie('userdata'); // Clear the userdata cookie
//     res.redirect('/login'); // Redirect to login
// });

app.listen(2000, () => {
    console.log('Server started on port 2000');
});
