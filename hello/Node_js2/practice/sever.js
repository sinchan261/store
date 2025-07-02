// const {first,store,add,sub}=require('./child.js');
// console.log(add(8,2))
// console.log(sub(5,2))
// console.log(first)

// //?--second part
// const {sayhi,saybye}=require('./child.js');
// console.log(sayhi('saikat'))
// console.log(saybye('sinchan'))
//?third part
// const {sayhi,sayhello}=require('./child.js')
// console.log(sayhi('sinchan'));
// console.log(sayhello('saikat'));
//?fourth part
// import greet ,{add,sub}from './chil.js';
// console.log(greet('saikat'))
const os=require("os");
console.log(os.arch());
console.log(os.cpus());
console.log(os.endianness())
console.log(os.freemem())
console.log(os.homedir())
console.log(os.hostname())
console.log(os.release())