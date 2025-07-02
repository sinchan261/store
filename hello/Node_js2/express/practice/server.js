const express=require('express');
const port=2000;
const app=express();
app.use(express.json());
const subapi=require('./subapi.js');
const subrouter=require('./subrouter.js')
const api=[
    {
        username:'saikat',id:'01',subject:'Math',
    },
    {
        username:'Mainak',id:'02',subject:'biology',
    }
]
app.all('/',(req,res)=>{
    console.log(req.method)
    res.send(
        'you are in home page'
   )
})

app.use('/',subapi)
app.use('/',subrouter)

app.listen(2000,()=>{
console.log('connected')
})