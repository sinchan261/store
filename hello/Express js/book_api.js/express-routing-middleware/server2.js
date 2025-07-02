const express = require('express');
const path = require('path'); // Import path module to resolve paths
const port = 3002;
const app = express();

// Correct the path to use the appropriate separator and resolve the absolute path
const userRouter = require('./router2.js');
//const postrouter=require('./postrouter.js')
const isauthen=require('./middleware/isauthentication.js')
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the main app"
    });
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Home Route

// Use the user routes
app.use("/",isauthen,userRouter);
//app.use("/post",postrouter)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});