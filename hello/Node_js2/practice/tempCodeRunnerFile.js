const fs=require("fs");
const databuffer=fs.readFileSync('./text.txt')
console.log(databuffer.toString())
fs.readFile('./text.txt',(error,content)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log(content.toString())
    }
})
fs.writeFileSync('./text.txt','i adding a text on your file')
fs.writeFile("./text.txt","i adding a text using synchronusly",(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('file has been completed')
    }
})
fs.appendFileSync('./append.txt',"using synchronus append file method");
fs.appendFile('./appe.txt',"Append file",(error)=>{
    if(error){
console.log(error)
    }
    else{
        console.log('create')
    }
})
fs.access('./text.txt',(error)=>{
   if(error){
     console.log(error)}
   else{
    console.log("file exist")
   }
})

fs.unlink('./text.txt',(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('file unlink')
    }
})