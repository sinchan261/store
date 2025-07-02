
const express = require('express');
const app = express();
const path = require('path');
const session=require('express-session');// npm i express-session

const mongostore=require("connect-mongo");// npm i connect-mongo
const cookieparser = require('cookie-parser');
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const MongoStore = require('connect-mongo');
app.use(express.urlencoded({extended:true}))
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
app.use(cookieparser()); // This middleware parses the incoming request cookies and populates them into req.cookies.
// It allows the application to easily extract the cookie data sent by the client browser, which can be used for various purposes like user authentication.

//*--custome middleware--/

//! isAuthenticated (Authentication )
const isAuthenticated=(req,res,next)=>{
    const username=req.session.userdata? req.session.userdata.username:null
    if(username){
        return next();
    }
    else{
        res.redirect("/login");
    }
}
//!is admin(Authorization)
const isAdmin=(req,res,next)=>{
    const admin=req?.session?.userdata?.role==='admin'
    if(admin){
        return next();
    }
else{
        res.redirect("Fobideen,access denied");
    }
}

//!--configure express session--
app.use(session({
    secret:'gsls',//we can use any value,mostly we store this in environmental variable
 //this isrequired option that is used to sign the session id cookie and then receive
    resave:false,
//the option controls whether the session should be saved back to the session store,even if the session was never modified during the request for this setting to false means that the session will not received,if it is not 
//being modified and we have saved or initialized
 saveUninitialized:true,
 //this one determines whether a new session that has not been modified should be saved to the store
 //so setting is true means that a session will be stored even if it is not modified 
 cookie:{
    maxAge:60*60*100//expires in one hour
    // ,secure: true, // Ensure the browser only sends the cookie over HTTPS
    // httpOnly: true // Prevents client-side JavaScript from accessing the cookie
 },
 store:MongoStore.create({
    mongoUrl:url,
 })
//the store helps us to store all the session in our mongodb
//with this one being configured ,we have access to the session in any of these routes
}))
// Home route

app.get('/', (req, res) => {
    console.log(req.session);
    res.render('home');
});

// Login route (login form)
app.get('/login', (req, res) => {
    res.render('login');
});
//Admin route
app.get('/admin-only',isAdmin,(req, res) => {

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
app.get('/register', (req, res) => {
    res.render("register")
});

// Login route logic
app.post('/login', async(req, res) => {
  const {username,password}=req.body;
const userfound=await user.findOne({
    username

})
if(userfound && await bcrypt.compare(password,userfound.password)){
   //!create session (save the user into session);
   req.session.userdata={
    username:userfound.username,
    role:userfound.role
   }
   //!Add the login user into session

    
        res.redirect('/dashboard');
}


     else {
        res.send("invalid login credentials"); // when displaying an error about a user account ,do not try to be more specefic by saying that password is not correct or username is incorrect
    }
});

// Dashboard
app.get('/dashboard',isAuthenticated,(req, res) => {
    //! Grab the user from the cookie
      console.log(req.session);
      const username=req.session.userdata? req.session.userdata.username:null
        res.render('dashboard',{username});

});

//? Logout route
app.get("/logout",(req,res)=>{
    req.session.destroy();//means you indirectely deleted the userdata field
    //!Logout
    res.redirect("/login");
})

app.listen(2000, () => {
    console.log('Server started on port 2000');
});
