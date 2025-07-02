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
app.get('/users/:id/name/:name',(req,res)=>{
    res.render('template.ejs',{
       id:req.params.id,
       username:req.params.name,
       is_premmium:true,
       emails:"gsaikat@gamil.com"
    })
})
//product page
app.get("/product",(req,res)=>{
    const products=[
        {name:"laptop",price:999},
        {name:'phone',price:799},
        {name:'mobile',price:9000}
    ]
    res.render("product.ejs",{products})
})
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
