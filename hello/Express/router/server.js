const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;

// A middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
    console.log('Time:', new Date()); 
    next()
  });

// A middleware sub-stack that shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  console.log("hfj")
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
}, (req, res, next) => {

 next()
});


router.get('/user/:id',(req,res,next)=>{
    if(req.params.id==='0'){
        next('route')
    }
    else{
        next()
    }

},(req,res,next)=>{
    res.send('regulare')
})
router.get('/user/:id',(req,res,next)=>{
    res.send('special')
})
// Use the router
app.use('/', router);

app.listen(port, () => {
  console.log('Server is running on port', port);
});
