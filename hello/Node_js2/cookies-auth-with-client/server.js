const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const users = [
    { username: 'john', password: '123', role: 'admin' },
    { username: 'saikat', password: '456', role: 'user' },
    { username: 'mainak', password: '200', role: 'admin' }
];

app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const userFound = users.find((user) => {
        return req.body.username === user.username && req.body.password === user.password;
    });

    if (userFound) {
        res.cookie('my-login', JSON.stringify(userFound), {
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});

app.get('/dashboard', (req, res) => {
    const userData = req.cookies['my-login'] ? JSON.parse(req.cookies['my-login']) : null;
    const username = userData ? userData.username : null;

    if (username) {
        res.render("dashboard", { username });
    } else {
        res.redirect("/login");
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('my-login');
    res.redirect('/login');
});

app.listen(2000, () => {
    console.log("app is running");
});
