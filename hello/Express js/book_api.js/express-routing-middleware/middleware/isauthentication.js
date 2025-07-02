//mimic Authentication
const isauthen=(req,res,next)=>{
const islogin=false;
//we are going to check if is logged in then we are going to call 
//next meaning that move on to the next middleware 
 if(islogin){
    next()
 }
 //otherwise we are going to send some message by saying rest dot json and provide A Message
 else{
    res.json({
        message:"Unauthorized"
    })
 }
}

module.exports=isauthen