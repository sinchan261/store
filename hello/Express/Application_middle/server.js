const express=require('express')
const app=express()
const port=3000;
app.get('/',(req,res)=>{
    res.send('you are home page')
})
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })
const first=(req,res,next)=>{
    console.log(req.originalUrl)
    console.log('you are now in first stage')
    next()
}
const second=(req,res,next)=>{
    console.log('you are in second stage')
    next()
}

app.use('/about',first,second,(req,res,next)=>{
    res.send('you are successfully done')
})
app.listen(port,()=>{
    console.log(`your server is start`)
})