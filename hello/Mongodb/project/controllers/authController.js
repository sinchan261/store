const User = require("../models/User");
//render login page
const bcrypt = require("bcrypt");
const passport = require("passport");
exports.getLogin = (req, res) => {
  // console.log(req.user)
  res.render("login", {
    title: "Login",
    user: req.user,
    error: "",
  });
};
//render login Logic
exports.Login = async (req, res, next) => {
  const { email, password } = req.body;
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", {
        title: "login",
        user: req.user,
        error: info.message,
      });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/auth/login");
    });
    
  })(req, res, next);
};
//Get register page
exports.getRegister = (req, res) => {
  res.render("register", {
    title: "Register",
    user: req.user,
    error: null,
  });
};
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.render("register", {
        title: "register",
        user: req.user,
        error: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.redirect("/auth/login");
  } catch (error) {
    res.render("register", {
      title: "Register",
      user: req.user,
      error: error.message,
    });
  }
};
//logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/login");
  });
};
