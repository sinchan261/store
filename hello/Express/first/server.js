const express = require('express');
const app = express();
const url=require('url')
const port = 3000;
const js = [
    { id: "01", name: "saikat", school: "dadpur" }
];

app.use(express.json());

app.all('/', (req, res,next) => {
    const method = req.method;
    console.log(method);
    if (method === 'GET') {
        res.status(200).set({
            'content-type': 'application/json'
        });
        res.json({
            js:(js[0]),
            op:"completed"
        });
    } else if (method === 'POST') {
        const store = req.body;
        console.log(store)
        res.status(200).set({
            'content-type': 'application/json'
        });
        res.send({
            store: JSON.stringify(store)
        });
    }
    next()
});

app.all('/about', (req, res,next) => {
    res.status(200).set({
        'content-type': 'text/plain'
    });
    res.send("you are now on the about page");
    next()
});

app.all('/about/b', (req, res) => {
    console.log(req.method);
    res.json({
        status: "ok",
        data: js
    });
});
app.all('/user',(req,res)=>{
    res.status(200).set({
        'content-type':'text/plain'
    })
    res.send('you are now user page')

})

app.all('/user/:userid/:add',(req,res)=>{

    // res.send(req.params)
    // console.log(req.params)
  res.send(`your user id is:${req.params.userid} and your address is${req.params.add}`)
  const passed=url.parse(req.url,true)
  console.log(passed)
if(passed.query.name=="saikat" &passed.query.age=="32"){
    console.log('name=saikat and age is 32')
}
})

app.listen(port, () => {
    console.log('server running');
});
