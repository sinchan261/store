module.exports={
    ensureAuthenticated:(req,res,next)=>{
        if(req.isAuthenticated()){
            console.log("authenticated")
            return next();
        }
        console.log("not authenticated")
        res.redirect("/auth/login")
    }
}

// exports. store=(req,res,next)=>{
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/auth/login");
// }
