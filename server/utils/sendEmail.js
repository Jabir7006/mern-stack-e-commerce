const createError = require("http-errors");
const sendEmail = require("./email");
const successResponse = require("../controllers/successController");

const handleEmailSend = async (emailData, res, accessToken) => {
  await sendEmail(emailData);
  try {
    return successResponse(res, {
      statusCode: 200,
      message: "please go to your email to activate your account",
      payload: accessToken,
    });
  } catch (error) {
    // if it is violating the schema error
    if (error.name === "validationError") {
      throw createError(422, error.message);
    }
    throw error;
  }
};

module.exports = handleEmailSend;
