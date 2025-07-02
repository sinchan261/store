
const express = require('express');
const app = express();
const path = require('path');
const cookieparser = require('cookie-parser');
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
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
const isauthenticated = (req, res, next) => {
    // Check if the user data exists in the cookies
    const userdatacookies = req.cookies.userdata;
    
    if (!userdatacookies) {
        return res.send("You are not logged in"); // Redirect or send an appropriate response
    }
    
    try {
        const userdata = JSON.parse(userdatacookies);
        if (userdata && userdata.username) {
            // Add the logged-in user to the request object
            req.userdata = userdata;
            //!when a user is logged in,we are going to assign the login user into the request object
            //!if the user is authenticated,we are going to have access to the user on the request object by providing our custom property
            return next();
        } else {
            res.send("You are not logged in");
        }
    } catch (error) {
        console.log(error);
        res.send("An error occurred");
    }
};
//!is Admin middleware
const isadmin=(req,res,next)=>{
    if(req.userdata&&req.userdata.role==='admin'){
        return next();
    }
    else{
  res.send('Forbidden:you do not have access ,admin only')
    }
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
    //! Prepare the login user data
        //! Find the user login details

    // Create some cookies (cookie)
        //? Setting the cookie with the userdata
        res.cookie('userdata', JSON.stringify({
            username:userfound.username, role:userfound.role
        }), {
            //? This option indicates the expiration of the cookie. We want our cookie to expire after three days.
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days expiration
            httpOnly: true, //? This option is a security feature that helps us to prevent cross-site scripting (XSS) attacks.
            //? It prevents client-side scripts from accessing the cookie, making the cookie less vulnerable to XSS attacks.
            secure: false, //? This option ensures that the cookie is sent over an HTTPS connection only, adding a layer of security.
            //? When it is set to true, the cookie will only be sent in a secured context. Since it is set to false here,
            //? it allows the cookie to be sent over unencrypted HTTP connections as well.
            //? It should be set to true for production environments.
            sameSite: 'strict' //? This option controls when the cookie should be sent with cross-site requests.
            //? It helps to mitigate cross-site request forgery (CSRF) attacks.
            //? The strict value means that the cookie will only be sent in a first-party context,
            //? meaning the site is the same as the one in the browser's address bar. It won't be sent along with requests
            //? initiated by a third-party website.
        });
        res.redirect('/dashboard');
}


     else {
        res.send("invalid login credentials"); // when displaying an error about a user account ,do not try to be more specefic by saying that password is not correct or username is incorrect
    }
});

// Dashboard
app.get('/dashboard', (req, res) => {
    //! Grab the user from the cookie
    const userdata = req.cookies.userdata ? JSON.parse(req.cookies.userdata) : null;
    console.log(userdata); // The purpose of this cookie parser is to parse the cookie in the browser when the user makes their request (npm i cookie-parser).
    const username = userdata ? userdata.username : null;
//  console.log(username)
    //! If username exists, render the dashboard
    if (username) {
        res.render("dashboard", { username });
    } else {
        //! Otherwise, redirect to login
        res.redirect('/login');
    }
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
