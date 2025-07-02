const http = require("http");
const fs = require("fs");
const url = require("url");

const users = [{
    name: "saikat",
    age: 19,
    mob: "+9136929289"
}];

const my_server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    console.log(parsedUrl);

    if (parsedUrl.pathname === '/') {
        res.end("This is the home page");
    } else if (parsedUrl.pathname === '/about') {
        res.end("This is the about page");
    } else if (parsedUrl.pathname === '/object') {
        res.end(`This is your short information: ${JSON.stringify(users)}`);
    } else if (parsedUrl.query.user_name === "saikat") {
        res.end(`Hello user ${parsedUrl.query.user_name}, are you ready?`);
    } else if (req.method === "POST" && parsedUrl.pathname === '/Fetch') {
        let store = '';

        req.on('data', (chunk) => {
            store += chunk;
        });

        req.on('end', () => {
            try {
                let newUser = JSON.parse(store);
                users.push(newUser);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(users));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON data" }));
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

const port = 3000;
my_server.listen(port, () => {
    console.log(`Your present server is local http://localhost:${port}`);
});
