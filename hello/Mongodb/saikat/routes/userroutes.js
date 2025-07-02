const upload = require("../config/multer");
const { getuserprofile, geteditform, update_profile, deleteuser } = require("../controllers/usercontoller");
const { ensureAuthenticated } = require("../middlewares/auth");
const express=require("express")

const profile_data=express.Router();
profile_data.get("/profile",ensureAuthenticated,getuserprofile)
profile_data.get("/edit",ensureAuthenticated,geteditform)
profile_data.post("/profile",ensureAuthenticated,upload.single("profile_pic"),update_profile)
profile_data.post("/delete",ensureAuthenticated,deleteuser)

module.exports=profile_data;