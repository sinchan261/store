const http = require("http");
const fs = require("fs");
const url=require('url')

// We can build a server using the http package
const my_server = http.createServer((req, res) => {
    console.log(req.url);
    //console.log(req.method);
    const parse=url.parse(req.url,true)
    console.log(parse)
   //console.log(parse)
    const log = `${Date.now()}  ${req.url} New request received \n`;
    console.log("server start");

    // Append the log to the file
    fs.appendFile('./text.txt', log, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
   if(parse.query.myname==="saikat sinchan ghosh"){
    res.end(`hi ${parse.query.myname} welcome to our page`)
   }    
    // Handle the request and send the appropriate response
    else{switch (parse.pathname) {
        case "/":
            res.end('Welcome To Our Home-page');
            
            break;
        case "/about":
            res.end('Welcome To Our About-page');
            break;
        case "/sports":
            res.end('This is the sports page');
            break;
           
        case"/about/query":
         res.end("hello this response go from pathname side")
         break;
         default:
            res.end('Not found');
            break;
    }
    }
});

my_server.listen(200, () => {
    console.log(`Your local server is http://localhost:200`);
});
