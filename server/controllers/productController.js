const createError = require("http-errors");
const Product = require("../models/Product");
const successResponse = require("./successController");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");
const ApiFeatures = require("../utils/apiFeatures");

const getAllProducts = async (req, res, next) => {
  try {
    const resPerPage = req.query.limit || 4;
    const count = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .sort()
      .pagination(resPerPage);
    const products = await apiFeatures.query;

    if (!products || products.length === 0) throw createError(404, "no products found");

    return successResponse(res, {
      statusCode: 200,
      payload: products,
     
    });
  } catch (error) {
    next(error);
  }
};


const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, category, brand, inStock, quantity, sold } = req.body;

    if (!title || !description || !price || !category || !brand || !inStock || !quantity || !sold) {
      throw createError(400, "all fields are required");
    }

    //check if product already exists

    const productExists = await Product.findOne({ title });
    if (productExists) {
      throw createError(409, "product already exists");
    }

    const slug = slugify(title, { lower: true });

    const imagePath = `public/images/products/${req.file.filename}`;

    const newProduct = new Product({
      title,
      slug,
      description,
      price,
      image: imagePath,
      category,
      brand,
      inStock,
      quantity,
      sold,
    });
    const product = await newProduct.save();

    return successResponse(res, {
      statusCode: 201,
      message: "product was created successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw createError(404, "product not found");
    }

    return successResponse(res, {
      statusCode: 200,

      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, brand, inStock, quantity, sold } = req.body;

    const getProduct = await Product.findById(id);

    if (!getProduct) {
      throw createError(404, "product not found with this id");
    }

    let slug;

    if (title) {
      slug = slugify(title, { lower: true });
    }

    if (getProduct.image !== "public/images/products/undefined" && req.file) {
      const oldImagePath = path.join(__dirname, "..", getProduct.image);
      fs.unlinkSync(oldImagePath);
    }

    const imagePath = req.file && `public/images/products/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        slug: slug,
        description,
        price,
        image: imagePath,
        category,
        brand,
        inStock,
        quantity,
        sold,
      },
      { new: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: "product updated successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      throw createError(404, "no product found with this id");
    }

    //delete image

    if (product.image !== "public/images/products/undefined") {
      const oldImagePath = path.join(__dirname, "..", product.image);
      fs.unlinkSync(oldImagePath);
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    return successResponse(res, {
      statusCode: 200,
      message: "product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const rating = async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      await Product.updateOne(
        {
          ratings: { $elemMatch: { postedby: _id } },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  rating,
};
