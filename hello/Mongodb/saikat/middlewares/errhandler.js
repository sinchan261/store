const errorhandeler=(err,req,res,next)=>{
    res.status(err.status||500);
    res.render("error",{
        titile:"error",
        error:err.message,
        user:req.user
    })
}
module.exports=errorhandeler