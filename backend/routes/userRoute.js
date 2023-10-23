const express = require("express");
const {
  getAllUsers,
  handleRegister,
  getSingleUser,
  updateUser,
  deleteUser,
  handleActivateAccount,
} = require("../controllers/userController");
const upload = require("../middlewares/imageUpload");
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth");

const userRoute = express.Router();

userRoute.get("/", getAllUsers);
userRoute.post("/register", isLoggedOut, upload.single("image"), handleRegister);
userRoute.post("/activate", handleActivateAccount);
userRoute.get("/profile", isLoggedIn, getSingleUser);
userRoute.put("/:id", isLoggedIn, upload.single("image"), updateUser);
userRoute.delete("/:id", isLoggedIn, upload.single("image"), deleteUser);

module.exports = userRoute;
