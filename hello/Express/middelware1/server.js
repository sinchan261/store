const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Invoke express.json() as a function

app.post('/post', (req, res, next) => {
    res.send(req.body);
    next();
});

app.get('/', (req, res, next) => {
    res.send('You are in the home page');
});

app.listen(port, () => {
    console.log("Server is running");
});
