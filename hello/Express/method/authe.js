const logger=(req,res,next)=>{
    const islogin=true;
    if(islogin){
        next()

    }
    else{
        res.json({
            message:'un authorized'
        })
    }
}
module.exports=logger