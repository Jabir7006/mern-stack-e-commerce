const express = require("express");
const { loginUser, logoutUser } = require("../controllers/authController");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");

const authRoute = express.Router();

authRoute.post("/login", isLoggedOut, loginUser);
authRoute.get("/logout", isLoggedIn, logoutUser);

module.exports = authRoute;
