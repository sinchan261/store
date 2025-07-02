const express = require('express');
const app = express();
const path = require('path');
const cookieparser = require('cookie-parser');

// app.use(express.urlencoded({ extended: true }));

// This middleware is used to parse incoming requests with a URL-encoded payload.
// URL-encoded data is the way browsers send form data in HTML forms. 
// When setting the extended option to true, it allows the middleware to parse extended syntax, 
// allowing rich objects and arrays to be URL-encoded into the query string.
// This setting is important when receiving data from the HTML form, which we are going to use.

//! Set the view engine
app.use(express.json());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(cookieparser()); // This middleware parses the incoming request cookies and populates them into req.cookies.
// It allows the application to easily extract the cookie data sent by the client browser, which can be used for various purposes like user authentication.

// Simulated database of users
const users = [
    { username: 'john', password: '123', role: 'admin' },
    { username: 'saikat', password: '456', role: 'user' }
];

// Home route
app.get('/', (req, res) => {
    res.json({message:'welcome to the api'});//for api we need to return json data
});


// Login route logic
app.post('/login', (req, res) => {
    console.log(req.body);

    //! Find the user login details
    const userfound = users.find((user) => {
        return user.username === req.body.username && user.password === req.body.password;
    });

    // Create some cookies (cookie)
  
        //! Prepare the login user data
        //? Setting the cookie with the userdata
        res.cookie('userdata', JSON.stringify(userfound), {
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
        if (userfound) {
            res.json({meassge:'login success'});
        }
        // console.log('User found:', userfound);
      else {
        res.json({message :'login failed'}) // Redirect to login if the user is not found
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
        res.json({message: `welcome ${username},role:${userdata.role}`});
    } else {
        //! Otherwise, redirect to login
      res.json({message:"unauthorized please login first"})
    }
});

//? Logout route
app.get("/logout",(req,res)=>{
    //!Logout 
    res.clearCookie('userdata');
    res.json({message:'Logged out successfully'});
})
// app.post('/logout', (req, res) => {
//     res.clearCookie('userdata'); // Clear the userdata cookie
//     res.redirect('/login'); // Redirect to login
// });

app.listen(2000, () => {
    console.log('Server started on port 2000');
});