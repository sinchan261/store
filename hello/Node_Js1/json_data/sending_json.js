//1.import required modules
const http = require("http");
const url=require("url")
//
console.log(http)
//Define the handeler
//!containt our logice and also store the data that is going to be snet back 
//!to the user if the user make a request to our server
const request_handler = (req, res) => {
    const data={
        id:123,
        name:"agnes appish",
        email:"agnes@gmail.com"
    }
 
        res.setHeader("content-type","application/json")
        res.writeHead(200,{"content-type":"text/plain"})
        res.end(`Product ID ${JSON.stringify(data)}`)
    
    };                   
 
    const server = http.createServer(request_handler);
    console.log(server);
    //start our server
    const port=3000;
    
    server.listen(port, () => {
        console.log(`The server is running on http://localhost:${port}`);
    });

    /*if(passedurl.pathname==="/" &&req.method=="GET"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('This is your home page');

    }
    else if(passedurl.pathname==="/about" && req.method=="GET"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('This is our About page');
    }
    else{
        res.end("page not found")
    }*/
    //if(passed)
    //console.log(res)
    //send response
    //200:everything is okay
    //and second option indicates what kind of data i want to send
   
    //we need to end th response by sending something something to the user
    //by using rest.end
    

//this callback function is going to run when our servers get connected