//1.import required modules
const http = require("http");
//
console.log(http)
//Define the handeler
//!containt our logice and also store the data that is going to be snet back 
//!to the user if the user make a request to our server
const request_handler = (req, res) => {
    console.log(req); 
    console.log(res)
    //send response
    //200:everything is okay
    //and second option indicates what kind of data i want to send
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //we need to end th response by sending something something to the user
    //by using rest.end
    res.end('Hello, world, what do you do for a living?');
};
//create the  server
const server = http.createServer(request_handler);
console.log(server);
//start our server
const port=3000;
//port here refers to the refer to the port number on which the server
//is listening to
//on the sevrer we have a method called listen ,meaning that our server 
//is ready to listen to any requests
server.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});
//this callback function is going to run when our servers get connected