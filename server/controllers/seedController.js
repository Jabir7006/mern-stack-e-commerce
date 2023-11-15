const data = require("../data");
const Product = require("../models/Product");
const successResponse = require("./successController");

const seedProduct = async (req, res, next) => {
  try {
   
    await Product.deleteMany({});

   
    const products = await Product.insertMany(data.products);

    return successResponse(res, {
      statusCode: 200,
      payload: products,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { seedProduct };
