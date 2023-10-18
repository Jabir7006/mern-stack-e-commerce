const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw createError(401, "you are not logged in. please login first");
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (!decoded) {
        throw createError(401, "you are not logged in. please login first");
      }
      req.user = decoded.user;
      next();
    } catch (error) {
      throw createError(401, "Unauthorized");
    }
  } catch (error) {
    next(error);
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    const token = req.cookies.token;
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
