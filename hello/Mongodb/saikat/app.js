const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRoutes = require("./routes/authroutes");
const passportAuth = require("./config/passport");
require("dotenv").config();
const methodOverride=require("method-override")
const postrouter=require("./routes/postroutes");
const errorhandeler = require("./middlewares/errhandler");
const commentroutes = require("./routes/commentroute");
const profile_data = require("./routes/userroutes");
const app = express();
const port = process.env.PORT || 5173;

// Configure session with MongoStore
app.use(
  session({
    secret:  "default_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);
//method override
app.use(methodOverride("_method"))
// Initialize Passport
passportAuth(passport);
app.use(passport.initialize());
app.use(passport.session());

// Set EJS template engine
app.set("view engine", "ejs");

// Define main route
app.get("/", (req, res) => {
  res.render("home",{
    title:"Home page",
    user:req.user,
    error:null
  })
});

// Use authentication routes
app.use("/auth", userRoutes);

app.use("/posts",postrouter)
app.use("/",commentroutes)
app.use("/user",profile_data)
app.use(errorhandeler)
// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URL, )
  .then(() => {
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
