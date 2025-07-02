const fs=require("fs")/**/
const os=require("os")
console.log(os.cpus().length)
const text=fs.readFileSync("./text.txt","utf-8")
console.log(text)
fs.readFile('./text.txt',"utf-8",(con,error)=>{
if(error){
    console.log(error)
}
else{
    console.log(con)
}

})
console.log("hello")
/*fs.writeFileSync("./text.txt","hello world")
fs.writeFile("./text.txt","hello world Asynac",(error)=>{
if(error){
    console.log(error)
}
else{
    console.log("file has been complete")
}
})//basically we use utf-8 for deconding the text which is 
///stored in differnt file
const store=fs.readFileSync('./module/contact.txt','utf8')
console.log(store)
fs.readFile('./module/contact.txt','utf8',(con,err)=>{
if(err){
    console.log(err)}

else{
    console.log(con)
}
})
const date=fs.appendFileSync('./text.txt', new Date().getDate().toString())

fs.cpSync("./module/contact.txt","./copy.txt")
fs.unlinkSync("./copy.txt")
const check=fs.statSync("./text.txt").isFile()
console.log(check)
fs.mkdirSync("mydocss/a/b",{recursive:true})*/