module.exports={
    ensureAuthenticated:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect("/auth/login")
    }
}