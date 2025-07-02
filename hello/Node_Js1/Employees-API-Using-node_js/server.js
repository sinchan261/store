// Import required modules
const http = require("http");
const url = require("url");

// Mimic database
const employees = [
    { id: 1, name: "saikat" },
    { id: 2, name: "sinchan" },
    { id: 3, name: "ghosh" }
];

// Define the handler
const request_handler = (req, res) => {
    const { method, url: reqUrl } = req;
    console.log(reqUrl);

    const parts = reqUrl.split('/');
    const id = parts[2];

    console.log(parts);
    console.log(id);

    if (method === "GET" && reqUrl === '/employees') {
        res.writeHead(200, { "content-type": "application/txt" });
        res.end(JSON.stringify(employees));
    } else if (method === "GET" && parts[1] === "employees" && id) {
        const employee = employees.find((emp) => emp.id === parseInt(id));

        if (employee) {
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(employee));
        } else {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "Employee Not Found" }));
        }
    } else if (method === "POST" && reqUrl === '/employees') {
        let body = "";
        // Listen to the event of making POST request
        req.on('data', (chunk) => {
            body += chunk;
        });
        // Send the response
        req.on('end', () => {
            const newEmployee = JSON.parse(body);
            employees.push(newEmployee);
            res.writeHead(201, { "content-type": "application/json" });
            res.end(JSON.stringify({ employee: employees, newemployee: newEmployee }));
        });
    } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Endpoint Not Found" }));
    }
};

// Create server
const server = http.createServer(request_handler);

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});

   
fetch('http://localhost:3000/employees').then((re)=>{
    console.log(re)
    return re.json();
}).then((df)=>{
    console.log(df)
}).catch((error)=>{
    console.log(error)
})