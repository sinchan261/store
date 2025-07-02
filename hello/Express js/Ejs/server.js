const express = require("express");
const { contentType } = require("mime-types");
const path = require("path");
const app = express();
const PORT = 8082;

//Serve the static files/folde
app.use(express.static(path.join(__dirname,"public")))
//set the view page engine as ejs
app.set("view engine","ejs")

//Render Home page
app.get('/',(req,res)=>{
    //res.sendFile(path.join(__dirname,"views","home.html"))
    res.render('home.ejs')
    res.status(200).set({
        'Content-Type': 'text/html',
    });
})
//you do not need to specify the folder namefor example for ./views/home.ejs
//and the name,Express is smart to locate where the file is so why we name it as a views
//Render About page
app.get('/about',(req,res)=>{
   
    res.render('about.ejs')
})
//Render Contact page
app.get('/contact',(req,res)=>{
    
    res.render('contact')
})
//Render Gallery Page
app.get('/gallery',(req,res)=>{
  res.render('gallery.ejs')
})
app.get('/produt', (req, res) => {
    const products = [
        { name: "laptop", price: 999 },
        { name: "phone", price: 799 },
        { name: "TV", price: 1200 }
    ];
    res.render('product.ejs', { products });
});

app.get('/users',(req,res)=>{
    //dummy user content
    const userdata={}
    res.render("userdata",{username:'Alice'
        , age:25,
        ispremium:false,
        emails:'alice@gmail.com',
    islogin:true})
  })
//!Start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
