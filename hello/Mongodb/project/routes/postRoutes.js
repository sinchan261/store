const express=require("express")
const {getPostForm,createpost}=require("../controllers/postcontroller")
const postRoutes=express.Router();
//get post form
const { ensureAuthenticated}=require('../middlewares/auth');
postRoutes.get("/add",getPostForm
)
const upload=require("../config/multar")
//post logic
postRoutes.post('/add', ensureAuthenticated,upload.array("images",5),createpost)
//we can specify the maximum of the images that we want to upload
module.exports=postRoutes