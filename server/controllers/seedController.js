const data = require("../data");
const Blog = require("../models/Blog");
const Product = require("../models/Product");
const successResponse = require("./successController");
const cloudinary = require("../configs/cloudinary");


const seedProduct = async (req, res, next) => {
  try {
 
    await Product.deleteMany({});

    const products = await Promise.all(
      data.products.map(async (product) => {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(product.image, {
          folder: "ecommerce/products", // Optional: You can organize your images into folders
        });

        // Update the product object with the Cloudinary URL
        product.image = result.secure_url;

        // Create the product in the database
        return Product.create(product);
      })
    );


    return successResponse(res, {
      statusCode: 200,
      payload: products,
    });
  } catch (error) {
    next(error);
  }
};


const seedBlog = async (req, res, next) => {
  try {
    await Blog.deleteMany({});

    const blogs = await Blog.insertMany(data.blogs);

    return successResponse(res, {
      statusCode: 200,
      payload: blogs,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = { seedProduct, seedBlog };
