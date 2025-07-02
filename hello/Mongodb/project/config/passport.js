const  LocalStrategy=require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const User=require("../models/User");
module.exports=function(passport){
    //Define the local strategy for email and password authentication
    passport.use(new LocalStrategy({
        usernameField:"email",

    },async(email,password,done)=>{
        try{
            //find the user
            const user=await User.findOne({email})
            if(!user){
                return done(null,false,{
                    message:"User not found with that email",
                })
            }
            // compare the provided password with the hashed password in the data base
            const isMatch=await bcrypt.compare(password,user.password)
             if(!isMatch){
                return done(null,false,{message:"incorrect password"})
             }
             return done(null,user)

        }catch(error){
         return done(error)
        }
  
    }
)
)
//serializeuser:determines which data of the user object should be stored in the session.here ,we store the user id
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//Deseriallize the user object based on the user id stored in the session
passport.deserializeUser(async function(id,done){
    try{
  const user=await User.findById(id);
  done(null,user);
    }
    catch{
    done(error)
    }
})
}

