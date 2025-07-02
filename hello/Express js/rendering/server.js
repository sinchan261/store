const express = require("express");
const path = require("path");
const app = express();
const PORT = 8082;
//Serve the static files/folde
app.use(express.static(path.join(__dirname,"public")))
console.log(path.join(__dirname,"views","about.html"))
//Render Home page
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","home.html"))
})
//Render About page
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","about.html"))
})
//Render Contact page
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","contact.html"))
})
//Render Gallery Page
app.get('/gallery',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","gallery.html"))
})
//!Start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
