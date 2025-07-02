const express=require('express')
const router=express.Router()
const api=[
    {
        username:'saikat',id:'01',subject:'Math',
    },
    {
        username:'Mainak',id:'02',subject:'biology',
    }
]
// app.all('/api',(req,res)=>{
   
//     api.push(req.body)
//     if(req.method==='POST'){
//     console.log(req.body);
//     }
//     res.json(api)
// })
router.all('/api',(req,res)=>{
    api.push(req.body)
    if(req.method==='POST'){
    console.log(req.body);
    }
    res.json(api)
})
router.get('/api/:id', (req, res) => {
    const store = Number(req.params.id);
    const length = api.length;

    if (store < length) {
        res.json(api[store]);
    } else {
        res.status(404).send('Wrong index');
    }
});
module.exports=router