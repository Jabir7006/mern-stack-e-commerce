const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw createError(401, "please login or register first");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded.user;

    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.isAdmin) {
      throw createError(403, "you are not authorized to access this route");
    }

    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (token) {
      throw createError(400, "you are already logged in. please logout first");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
  isLoggedOut,
};
