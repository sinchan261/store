const express=require("express");
const User=require("../models/User")
const userRoutes=express.Router();
const {register,getRegister,getLogin,Login, logout}=require("../controllers/authController")
userRoutes.post("/login",Login)

userRoutes.get("/login",getLogin)
userRoutes.get("/register",getRegister)

//main logic for user registration
userRoutes.post("/register",register)
//
userRoutes.get("/logout",logout)

module.exports=userRoutes;