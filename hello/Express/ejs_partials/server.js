const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
//Serve the static files/folde
app.use(express.static(path.join(__dirname,"public")))
//!Start the server
//homepage
app.get('/',(req,res)=>{
    res.render("home.ejs")

})
app.get('/about',(req,res)=>{
    res.render("about.ejs")

})
app.get('/gallery',(req,res)=>{
    res.render("gallery.ejs")

})
app.get('/contact',(req,res)=>{
    res.render("contact.ejs")

})

//product page

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
