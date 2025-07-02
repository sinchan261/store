const express = require("express");
const path = require("path");
const ejslayout = require("express-ejs-layouts");
const { error } = require("console");
const app = express();
const PORT = 3000;

// Serve the static files/folder
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine as ejs
app.set("view engine", "ejs");
app.use(ejslayout);
app.set('layout', 'layout/main-layout');

// Start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

// Homepage
app.get('/', (req, res) => {
    res.render("home");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/gallery', (req, res) => {
    res.render("gallery");
});

app.get('/contact', (req, res) => {
    res.render("contact");
});

// Products page
app.use((req,res,next)=>{
    const error=new Error("page not found")
    next(error)
})
app.use((error,req,res,next)=>{
    res.render('error',{Error:error.message})
})