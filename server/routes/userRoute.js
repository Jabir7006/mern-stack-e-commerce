const express = require("express");
const {uploadUserImage} = require("../middlewares/imageUpload");
const {
  getAllUsers,
  registerUser,
  activateUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");
const userRoute = express.Router();

userRoute.get("/", getAllUsers);
userRoute.post("/register", isLoggedOut, uploadUserImage.single("image"), registerUser);
userRoute.post("/activate", activateUser);
userRoute.get("/profile/:id", isLoggedIn, getUser);
userRoute.put("/update/:id", isLoggedIn, uploadUserImage.single("image"), updateUser);
userRoute.delete("/delete", isLoggedIn, deleteUser);


module.exports = userRoute;
