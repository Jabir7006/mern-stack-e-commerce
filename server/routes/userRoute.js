const express = require("express");
const upload = require("../utils/imageUpload");
const {
  getAllUsers,
  registerUser,
  activateUser,
  getUser,
  updateUser,
  deleteUser,
  addToCart,
} = require("../controllers/userController");

const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const userRoute = express.Router();

userRoute.get("/", getAllUsers);
userRoute.post("/register", isLoggedOut, upload.single("image"), registerUser);
userRoute.post("/activate", activateUser);
userRoute.get("/profile/:id", isLoggedIn, getUser);
userRoute.put("/update/:id", isLoggedIn, upload.single("image"), updateUser);
userRoute.delete("/delete", isLoggedIn, deleteUser);


module.exports = userRoute;
