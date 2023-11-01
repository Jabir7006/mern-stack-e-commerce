const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const createJwt = require("../utils/createJwt");
const successResponse = require("./successController");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(400, "all fields are required");
    }

    //check user exist or not

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(404, "user not found. please register");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw createError(401, "email or password is incorrect");
    }

    const token = createJwt({ user }, process.env.SECRET_KEY, "30d");

    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "login successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return successResponse(res, {
      statusCode: 200,
      message: "logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  logoutUser,
};
