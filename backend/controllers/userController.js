const createError = require("http-errors");
const successResponse = require("./successController");
const User = require("../models/User");
const createJwt = require("../helpers/createJwt");
const fs = require("fs");
const path = require("path");
const handleEmailSend = require("../helpers/sendEmail");
const jwt = require("jsonwebtoken");

require("dotenv").config();

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
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw createError(400, "All fields are required");
    }

    //check user already exist

    const existUser = await User.findOne({ email });

    if (existUser) {
      throw createError(409, "User already exists. Please login");
    }

    const imagePath = req.file ? `public/images/users/${req.file.filename}` : "";

    const activationToken = createJwt(
      { firstName, lastName, email, password, image: imagePath },
      process.env.ACTIVATE_KEY,
      "10m"
    );

    const activationUrl = `http://localhost:5173/api/users/activate?activationToken=${encodeURIComponent(
      activationToken
    )}`;

    const emailData = {
      email,
      subject: "Account Verification",
      message: `Hello ${firstName}, Please verify your account by clicking the link : ${activationUrl}`,
    };

    await handleEmailSend(emailData, res, activationToken);
  } catch (error) {
    next(error);
  }
};

const handleActivateAccount = async (req, res, next) => {
  try {
    const { activationToken } = req.body;

    if (!activationToken) {
      throw createError(400, "Activation token is required");
    }

    try {
      const decoded = await jwt.verify(activationToken, process.env.ACTIVATE_KEY);

      if (!decoded) {
        throw createError(401, "Invalid activation token");
      }

      const existUser = await User.findOne({ email: decoded.email });

      if (existUser) {
        throw createError(409, "User already exists. Please login");
      }

      const token = createJwt({ decoded }, process.env.SECRET_KEY, "7d");

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Create the user using the information from the token
      const user = await User.create(decoded);

      return successResponse(res, {
        statusCode: 201,
        message: "Account activation successful",
        payload: { user, token },
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Activation token has expired");
      }

      return next(error);
    }
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

module.exports = {
  getAllUsers,
  handleRegister,
  handleActivateAccount,
  getSingleUser,
  updateUser,
  deleteUser,
};
