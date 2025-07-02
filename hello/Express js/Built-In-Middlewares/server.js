const express = require('express');
const port = 3002;
const app = express();
app.use(express.json())
// Create globally middelware fuction
/*app.use((req,res,next)=>{
  console.log(req.body)
  console.log("Built in middelware demo")
  //call next
  next()
})*/
//! Another method 
const log=(req,res,next)=>{
  console.log(`Request received at:${new Date(). toISOString() } for ${req.method} ${req.path}`)
  console.log("Built in middelware demo")
  //call next
  next()

}
app.use(log)
//? API level Middleware
//!logging details of every request 
//? home route
app.get("/",(req,res)=>{
  res.json({
      message:'welcome to this app',
   
  });

})
//Built in middleware
//!create a book
app.post("/books",(req,res)=>{
    res.json({
        message:'Built in middlewares demo',
      data: `Receiving data is ${JSON.stringify(req.body)}`
    });
  
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


