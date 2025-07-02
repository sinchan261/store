/*const { log } = require("console")
const fs=require("fs")
console.log(fs.appendFile)
console.log('hello')
//!Read a file
//synachronus
const data_buffer=fs.readFileSync('./sample.txt')
const content=data_buffer.toString()
console.log(content)
//Asynachronus
fs.readFile('./sample.txt',(error,content)=>{
         
    if(error){
        console.log(error)
        throw err;
    }
    else{
console.log(content);
    }

})
//sync method
fs.writeFileSync("./new.txt","file has been complete")
fs.writeFile("./new.txt","This is asynchronus method",(err)=>{
if(err){
    console.log(err)
    return
}
else{
    console.log('file has been written')
}
})
fs.appendFile('./new.txt',"Appended content",(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("File Contened appended")
    }
})

fs.access('./new.txt',(error)=>{
    if(error){
        console.log('File does not content');
    }
    else{
        console.log('file Exists')
    }
})
//Delete a file
fs.unlink('./new.txt',(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('file has been deleted')
    }
})*/
//using promises
const fs2=require("fs/promises")
try{
    const content=fs2.readFile("./sample.txt")
    console.log(content)
}
catch(error){
    console.log(error)
}

const readfilec=async()=>{
    try{
        const content=await fs2.readFile("./sample.txt","utf-8")
        console.log(content)
    }
    catch(error){
 console.log(error)
    }
}
readfilec()