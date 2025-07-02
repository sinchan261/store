const port=3000;
const express=require('express');
const router=require('./router.js')
const app=express();
app.get('/',(req,res)=>{
    res.send('This is a home page')
})

app.use('/',router)
// app.get('/user',(req,res)=>{
//     res.send('you are in user page')
// })
const my=function(req,res,next){
    console.log("yeaaaa")
    next()
}
// app.use(my)
app.get('/b',my,(req,res)=>{
    res.send('At least you understand the middeleware')
})
app.listen(port,()=>{
    console.log('server is start')
})