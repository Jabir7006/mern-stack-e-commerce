const createError = require("http-errors");
const sendEmail  = require("./email");
const successResponse = require("../controllers/successController");


const handleEmailSend = async (emailData, res, activationToken) => {
  await sendEmail(emailData);
  try {
    return successResponse(res, {
      statusCode: 200,
      message: "please check your email to activate your account",
      payload: {
        activationToken,
      },
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
