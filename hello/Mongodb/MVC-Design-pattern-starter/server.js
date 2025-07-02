const express = require("express");

const app = express();
//-----Connect DB------
const mongoose = require("mongoose");
const postrouter=require('./router/postrunter')
const url="mongodb+srv://gsaikat719:dOAtqA20FQ2Q6pOO@project1.cv8gnwa.mongodb.net/?retryWrites=true&w=majority&appName=project1";
mongoose
  .connect(url)
  .then(() => {
    console.log("DB has been connected");
  })
  .catch((e) => {
    console.log(e);
  });
const PORT = 3000;
//!Configure ejs
app.set("view engine", "ejs");
//!Middlewares
app.use(express.urlencoded({ extended: true }));


//!. Show Homepage
app.get("/", (req, res) => {
  res.render("index");
});
app.use('/',postrouter)

//Start the server
app.listen(PORT, console.log(`The server is running on port ${PORT}`));
