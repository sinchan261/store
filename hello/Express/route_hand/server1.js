const port = 3000;
const express = require("express");
const app = express();

// Middleware example
app.use(express.json());

// Route example
app.get('/', (req, res,next) => {
    console.log('Hello, World!');
    next()
},(req,res)=>{
    res.send('this is your next round')
})
app.get('/me',(req,res)=>{
    res.send('welcome in your own page')
})

const cb0=function(req,res,next){
    console.log('cb0 uploaded');
    next()
}
const cb1=function(req,res,next){
    console.log('cb1 completed')
   next()
}

app.get('/loop',[cb0,cb1],(req,res,next)=>{
    res.send('All programm successfully done')
})
app.listen(port, () => {
    console.log('server is running');
});
