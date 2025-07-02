const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const userdata={
    username:"agnes",
    age:28,
    is_premium:false,
    email:"gsaikat@gmail.com",
    is_login:false
}
//Serve the static files/folder
app.use(express.static(path.join(__dirname,'public')))
console.log(__dirname);
app.set('view engine','ejs')
app.get('/',(req,res)=>{
   res.render('home.ejs')
})
app.get('/about',(req,res)=>{
 res.render('about.ejs')
})
app.get('/contact',(req,res)=>{
res.render('contact')
})
app.get('/gallery',(req,res)=>{
   res.render('gallery')
    })
    //!render userdata
 
app.listen(PORT,()=>{
    console.log('server is running');
});
