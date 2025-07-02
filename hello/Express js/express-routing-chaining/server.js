const express = require('express'); // Import path module to resolve paths
const port = 3002;
const app = express();

// Correct the path to use the appropriate separator and resolve the absolute path
const userRouter = require('./router.js');
const postrouter=require('./post-router.js')
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the main app"
    });
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Home Route

// Use the user routes
app.use("/users", userRouter);
app.use("/post",postrouter)
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});