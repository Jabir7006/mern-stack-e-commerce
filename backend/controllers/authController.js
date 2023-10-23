const createError = require("http-errors");
const User = require("../models/User");
const successResponse = require("./successController");
const bcrypt = require("bcrypt");
const createJwt = require("../helpers/createJwt");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(400, "All fields are required");
    }
    //check user already exist

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(404, "User not found. please register first");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createError(401, "Incorrect password");
    }

    const token = createJwt({ user }, process.env.SECRET_KEY, "1d");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Login Successfully",
      payload: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogOut = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw createError(401, "you are not logged in. please login first");
    }

    res.clearCookie("token");

    return successResponse(res, {
      statusCode: 200,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const checkUserLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw createError(401, "you are not logged in. please login first");
    }

      jwt.verify(token, process.env.SECRET_KEY);

    return successResponse(res, {
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  handleLogin,
  handleLogOut,
  checkUserLoggedIn,
};
