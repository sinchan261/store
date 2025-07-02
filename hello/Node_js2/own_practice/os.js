const os=require("os")
const path=require("path")
const fs=require("fs")
console.log("cpu info:",os.cpus())
console.log("core of cpu",os.cpus().length)
console.log("Name of cpu:",os.endianness())
console.log("Home directory:",os.homedir())
console.log("Host Name:",os.hostname())
console.log("avg_load",os.loadavg())
console.log(os.networkInterfaces())
console.log(os.platform())
console.log(os.totalmem())
console.log(os.release())
console.log(path.basename("/user/subject/file.txt"))
console.log(path.dirname("/user/about/user.js"))
console.log(path.extname("/about/adgs/ui.com"))
console.log(path.join("/url/ghs","/saikat/ghosh"))
console.log(path.resolve("node.js","node","hello"))
console.log(path.isAbsolute("/adfs/gshs"))
console.log(path.parse("/uer/sgs/ye"))
fs.readFile('./text.txt',"utf-8",(err,con)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log(con)
  }
})
fs.writeFile(`text.txt`,"successful",(err,con)=>{
    if(err)
        console.log(err)
    else{
        console.log("Ok...")
    }
})
