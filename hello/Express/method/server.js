const express=require('express')
const app=express()
const port=3000;
const user=require('./route.js')
const logger=require('./authe.js')

app.get('/',(req,res)=>{
res.send('you are in home page')
}) 
const request=(req,res,next)=>{
    req.requestTime=Date.now();
    console.log(req.requestTime)
    res.json({
        completed:"yea"
    })
    next()
}
app.use('/',logger,user)
app.use('/po',request)
app.listen(port,()=>{
    console.log('your server running out')
})
