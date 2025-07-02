const user = require("../models/user");
let bcrypt = require('bcryptjs');
const passport=require("passport")
const asyncHandler = require('express-async-handler')
//!render login page
exports.getlogin = asyncHandler((req, res) => {
  // console.log(req.user)
  res.render("login",{
    title:"login",
    user:req.user,
    error:""
  });
})


//!main logic of login function
exports.login = asyncHandler(async (req, res,next) => {
  passport.authenticate("local",(err,user,info)=>{
    console.log({err,user,info});
    if(err){
      return next(err);
    }
    if(!user){
      return res.render("login",{
        title:"login",
        user:null,
        error:info.message,
      })
    }
    req.logIn(user,(err)=>{
      if(err){
        return next(err);
      }
      return res.redirect("/user/profile")
    })
  })(req,res,next)
})
//!register form
exports.getregister = asyncHandler(async (req, res) => {
  res.render("register",{
    title:"register",
    user:null,
    error:null,
  });
}
)
//!main register logic
exports.register = asyncHandler (async (req, res) => {
  const { username, email, password } = req.body;
  try {
   
    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res.render("register", {
        title: "register",
        user: req.user,
        error: "user already exists",
      });
    }

    //hash password
    const hassedpassword = await bcrypt.hash(password, 10);
    const use = new user({
      username,
      password: hassedpassword,
      email,
    });
    console.log(use)
    await use.save();
     return  res.render("login",{
      title:"login",
      user:null,
      error:info.message,
    })

  } catch (error) {
    res.render("register", {
      title: "register",
      user: req.user,
      error: error.message,
    });
  }
 
}
)
exports.logout=asyncHandler((req,res)=>{
  console.log("successfully logout")
  req.logout((err)=>{
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");

  });
  
}
)