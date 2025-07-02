const express = require("express");
const app = express();
app.use(express.json());
// const bodyparser=require('body-parser');
const upload = require("../config/multer");
const { getpost, sendpost } = require("../controllers/post_sen");
// app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

const post_router = express.Router();

//!getrequest of post
post_router.get("/create", getpost);
//!post request of post
post_router.post( "/create",upload.single("profile_pic"), sendpost);
module.exports = post_router;
