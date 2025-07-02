const express = require("express");
const { contentType } = require("mime-types");
const path = require("path");
const app = express();
const layouts = require("express-ejs-layouts");
const PORT = 8082;

//Serve the static files/folde
app.use(express.static(path.join(__dirname,"public")))
//set the view page engine as ejs
app.set("view engine","ejs")
//plugin the ejs  layout as a middleware
app.use(layouts)
//we need to set this template engine meaning that this what
//we are going to use
app.set("layout", "layout/main-layout");
//Render Home page

//you do not need to specify the folder namefor example for ./views/home.ejs
//and the name,Express is smart to locate where the file is so why we name it as a views
//Render About page
// Render Home page
app.get('/', (req, res) => {
    res.render('home');
});

// Render About page
app.get('/about', (req, res) => {
    res.render('about');
});

// Render Contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Render Gallery Page
app.get('/gallery', (req, res) => {
    res.render('gallery');
});
//404 Not found
app.use((req,res,next)=>{
    const error=new Error("Page Not Found");
    next(error)
})
app.use((err,req,res,next)=>{
    //app.render('error',{Error:err.message})
    console.log(err.message)
    console.log(req.path)
    app.render('error',{Error:err.message})
})
   

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
