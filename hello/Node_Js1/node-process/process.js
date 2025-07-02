console.log(process);
//Accessing the environment
//console.log(process.env)
//Accessing the Environment variables
let appEnv=process.env.SAIKAT_ENV ||'development'
console.log(`our Node App is Running ${appEnv}`)
//!process.exit()
if(process.env.node_ENV!="production"){
  console.log('this script should only learn in production')
  //process.exit()
}
//log the current working directory
console.log(`current working directory ${process.cwd()}`)
try{
    //change the current working directory
    process.chdir("/tmp");
    console.log(`The new working directory ${process.cwd()}`)
}
catch(error){
    console.log(`Error:${error}`)
}