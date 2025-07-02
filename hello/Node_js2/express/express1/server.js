const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const path = require('path');
const fs = require('fs'); 
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const logEntry = `${req.ip}:${Date.now()}:${req.method}:${req.path}`;
    fs.appendFile("log.txt", `\n${logEntry}`, (err) => {
        if (err) {
            console.error('Failed to write log:', err);
        }
        next();
    });
});

const store = (req, res, next) => {
    console.log("Request received");
    if (req.method === 'POST') {
        next();
    } else {
        res.status(405).send('Method Not Allowed');
        console.log(req.method);
    }
};

app.get('/', (req, res) => {
    res.set({
        'content-type': 'application/json'
    });
    res.status(200).json(users);
});

app.get('/users', (req, res) => {
    const html = `<ul>${users.map(user => `<li>${user.first_name}</li>`).join('')}</ul>`;
    res.send(html);
});

app.get('/users/:id', (req, res) => {
    const store = req.params.id;
    const user = users.find(e => e.id == store);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.all("/req", store, (req, res) => {
    const body = req.body;
    body.id = users.length + 1;
    users.push(body);
    if(!body.first||!body.last){
        return res.status(400).json({msg:'all field are not corrected field'})
    }
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            res.status(500).json({ status: "failure", error: "Failed to update user data" });
            return;
        }
        res.status(200).setHeader(
            'X-Name','saikat'
        ).set({
            'time':Date.now()
        }).json({
            status: "success",
            id: users.length
        });
    });
});

app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});
