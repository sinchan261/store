const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
//Serve the static files/folde
app.use(express.static(path.join(__dirname,"public")))
//!Start the server
//homepage
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","home.html"))

})
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","about.html"))

})
app.get('/gallery',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","gallery.html"))

})
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","contact.html"))

})

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
