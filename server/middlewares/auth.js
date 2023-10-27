const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw createError(401, "you are not logged in. please login or register first");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded.user;

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
  isLoggedOut,
};
