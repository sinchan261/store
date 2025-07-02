const os=require("os")
//console.log(os)

//os.arch()
//This method returns the architecture of the cpu
console.log("Os Architecture is :",os.arch());

//os.cpus() 
//And this method provides detailed information about each cpu core of the system
console.log("cpu info:",os.cpus());

//cpu.ndns
//The next one is called cpu.nDNS and this method returns the names of the cpu
//le :littele endiannes ,be:big endiannes
console.log(os.endianness);
//os.freemem 
//indiacates free memory in os
console.log(os.freemem())

//os.homedir() print the home directory of the current user

console.log(os.homedir())
//os.hostname()
console.log(os.hostname())
//os.loadavg
console.log(os.loadavg())

//os.networkinterface
console.log(os.networkInterfaces())
//os.plateform
//returns plateform where our script is running
console.log(os.platform())
//os.release()
//this method gives the os release version
console.log(os.release())

//os.totalmem()
//returns the total memory of the os system
console.log(os.totalmem())