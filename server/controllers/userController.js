const User = require("../models/User");
const createError = require("http-errors");
const successResponse = require("./successController");
const createJwt = require("../utils/createJwt");
const handleEmailSend = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      throw createError(404, "no user found");
    }

    return successResponse(res, {
      statusCode: 200,
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw createError(400, "all fields are required");
    }

    // check if user already exists

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw createError(409, "user already exists. please login");
    }

    const imagePath = req.file
      ? `public/images/users/${req.file.filename}`
      : "public/images/users/default.png";
    const accessToken = createJwt(
      { firstName, lastName, email, password, image: imagePath },
      process.env.ACCESS_KEY,
      "10m"
    );

    const activationUrl = `http://localhost:5173/api/users/activate?accessToken=${encodeURIComponent(
      accessToken
    )}`;

    const emailData = {
      email,
      subject: "Account Verification",
      html: `<h1>Hello ${firstName}</h1> <p>Please click here to activate your account</p> <a href="${activationUrl}" target="_blank">Activate Account</a>`,
    };

    await handleEmailSend(emailData, res, accessToken);
  } catch (error) {
    next(error);
  }
};

const activateUser = async (req, res, next) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      throw createError(401, "token not found");
    }

    const decoded = await jwt.verify(accessToken, process.env.ACCESS_KEY);

    // check if user already exists

    const userExists = await User.findOne({ email: decoded.email });

    if (userExists) {
      throw createError(409, "user already exists. please login");
    }

    const newUser = new User(decoded);

    const user = await newUser.save();

    const token = createJwt({ user }, process.env.SECRET_KEY, "30d");

    res.cookie("token", token, {
      httpOnly: true,
    });
    return successResponse(res, {
      statusCode: 201,
      message: "account activated successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    return successResponse(res, {
      statusCode: 200,
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;
    const user = req.user;

    if (!user) {
      throw createError(401, "please login or register first");
    }

    const updateUser = await User.findById(user._id);

    if (!updateUser) {
      throw createError(404, "User not found");
    }

    // Check if a new image file is provided
    if (req.file) {
      // Delete the old image file
      const oldImagePath = updateUser.image.replace("/images", "public/images");
      fs.unlinkSync(path.resolve(__dirname, `../${oldImagePath}`));

      // Set the new image path
      updateUser.image = `public/images/users/${req.file.filename}`;
    }

    // Update other user information
    updateUser.firstName = firstName;
    updateUser.lastName = lastName;

    // Save the updated user
    const updatedUser = await updateUser.save();

    return successResponse(res, {
      statusCode: 200,
      message: "user updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.user._id;

    // Find the user to get the image path
    const user = await User.findById(id);

    // Delete the user
    await User.findByIdAndDelete(id);

    //clear cookie
    res.clearCookie("token");
    return successResponse(res, {
      statusCode: 200,
      message: "user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  activateUser,
  getUser,
  updateUser,
  deleteUser,
};
