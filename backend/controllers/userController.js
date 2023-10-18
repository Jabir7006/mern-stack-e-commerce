const createError = require("http-errors");
const successResponse = require("./successController");
const User = require("../models/User");
const createJwt = require("../helpers/createJwt");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Add this line to require the fs module
require("dotenv").config();

const MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB
const ALLOWED_FILE_TYPES = ["jpg", "jpeg", "png"];
const UPLOAD_DIR = "public/images/users";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.originalname.replace(extname, "") + extname);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    const error = new Error("File type not allowed");
    console.log("error: ", error);
    return cb(error);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    if (!user) {
      throw createError(404, "No user found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const handleRegister = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, image } = req.body;

    //check user already exist

    const existUser = await User.findOne({ email });

    if (existUser) {
      throw createError(409, "User already exists. Please login");
    }

    const imagePath = req.file ? `public/images/users/${req.file.filename}` : "";

    const token = createJwt(
      { firstName, lastName, email, password, image: imagePath },
      process.env.SECRET_KEY,
      "1d"
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      image: imagePath,
    });

    return successResponse(res, {
      statusCode: 201,
      message: "Account created successfully",
      payload: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw createError(404, "User not found with this id");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { firstName, lastName } = req.body;
    const user = await User.findById(id);

    if (!user) {
      throw createError(404, "User not found with this id");
    }

    // Delete the old image file
    if (user.image) {
      const oldImagePath = path.join(__dirname, "..", user.image);
      fs.unlinkSync(oldImagePath);
    }

    const imagePath = req.file && `public/images/users/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        image: imagePath,
      },
      { new: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: "User updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      throw createError(404, "User not found with this id");
    }

    // Delete the user's image if it exists
    if (user.image) {
      const imagePath = path.join(__dirname, "..", user.image);
      fs.unlinkSync(imagePath);
    }

    const deletedUser = await User.findByIdAndDelete(id);

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
      payload: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, handleRegister, getSingleUser, updateUser, deleteUser, upload };
