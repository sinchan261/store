const express=require("express")
//!instance
const app=express()
console.log(app)
//!Create the port 
const port=8082
//!Define the route handelers
app.get('/',(req,res)=>{
   res.status(200).set({
    'content-type':'text/plain',
    'custom-header':'headervalue',
    'Another-header':'Anothervalue'

   });
 res.send('Hello world')
})
//start the server
app.listen(port,()=>{
    console.log(`servre is running on${port}`)
})