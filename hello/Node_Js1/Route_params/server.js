//1.import required modules
const http = require("http");
const url=require("url")
//
console.log(http)
//Define the handeler
//!containt our logice and also store the data that is going to be snet back 
//!to the user if the user make a request to our server
const request_handler = (req, res) => {
    console.log(req.url); 
    console.log(req.method)
    const passedurl=url.parse(req.url,true)
    console.log(passedurl)
    const pathname=passedurl.pathname;
    console.log(pathname)
    //split the parameter
    const path_compo=pathname.split('/').filter(Boolean)
    if(path_compo[0]=="products" && path_compo[1]){
        //Take the product id and send to the user
        //perform db query
        const productId=path_compo[1]
        res.writeHead(200,{"content-type":"text/plain"})
        res.end(`Product ID ${productId}`)
    }
      
    else{
        res.writeHead(200,{"content-type":"text/plain"})
        res.end(`NOT FOUND`)
    }
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