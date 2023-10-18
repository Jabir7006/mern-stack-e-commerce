const express = require("express");
const { handleLogin, handleLogOut, checkUserLoggedIn } = require("../controllers/authController");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");
const authRoute = express.Router();

authRoute.post("/login", isLoggedOut, handleLogin);
authRoute.get("/logout", isLoggedIn, handleLogOut);
authRoute.get("/verify", isLoggedIn, checkUserLoggedIn);

module.exports = authRoute;
