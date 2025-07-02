const { getlogin, getregister, login, register, logout } = require("../controllers/authcontroller");
const user=require("../models/user")
const express=require("express");
const userRoutes=express.Router();

userRoutes.use(express.urlencoded({ extended: true }));

//render login page
userRoutes.get("/login", getlogin);

//render register page
userRoutes.get("/register",getregister);

//!login post logic
userRoutes.post("/login",login);

//!register post logic
userRoutes.post("/register",register);
//!logout
userRoutes.get("/logout",logout)
module.exports=userRoutes;