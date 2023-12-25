const createError = require("http-errors");
const Product = require("../models/Product");
const successResponse = require("./successController");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("../configs/cloudinary");


const getAllProducts = async (req, res, next) => {
  try {
    const resPerPage = req.query.limit || 8;
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
      payload: {
        products,
       total: count,
      },
     
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategoriesAndBrands = async (req, res, next) => {
  try {
    const categories = await Product.find().select("category -_id").select("brand -_id");
   
    return successResponse(res, {
      statusCode: 200,
      payload: {
        categories: [ ...new Set(categories.map((item) => item.category))],
        brands: [ ...new Set(categories.map((item) => item.brand))],
      }
    })
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

    const image = req.file?.path;

    if(image) {
       const response = await cloudinary.uploader.upload(image, {
        folder : "ecommerce/products"
       })

       req.body.image = response.secure_url
    }

    const newProduct = new Product({
      title,
      slug,
      description,
      price,
      image,
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

    const product = await Product.findById(id).populate("ratings.postedBy", "firstName lastName image");

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

    if (
      findUser.image !== "public/images/users/default.png" && req.file
    ) {
     const pathSegment = findUser.image.split("/");
     const lastSegment = pathSegment[pathSegment.length - 1];
     
     const publicId = lastSegment.split(".")[0];
     
     const {result} = await cloudinary.uploader.destroy(`ecommerce/users/${publicId}`);

     if(result !== "ok"){
      throw createError(500, "image not deleted successfully. please try again");
     }

    }

    let image;

    if(req.file){
     const response = await cloudinary.uploader.upload(req.file.path, {
        folder: "ecommerce/users",
      })
      image = response.secure_url
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        slug: slug,
        description,
        price,
        image,
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

const rating = async (req, res,next) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    if (alreadyRated) {
      await Product.updateOne(
        {
          ratings: { $elemMatch: { postedBy: _id } },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        }
      );
    } else {
      await Product.findByIdAndUpdate(prodId, {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedBy: _id,
          },
        },
      });
    }


    
    const getAllRatings = await Product.findById(prodId);
    let totalRatings = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRatings);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRatings: actualRating,
      },
      { new: true }
    );

  const findUpdatedProduct = await Product.findById(prodId).populate("ratings.postedBy", "firstName lastName image");
 
   return successResponse(res, {
     statusCode: 200,
     message: "Thanks For Feedback",
     payload: findUpdatedProduct,
   })
  } catch (error) {
    console.error(error)
     next(error)
  }
};


module.exports = {
  getAllProducts,
  getAllCategoriesAndBrands,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  rating,
};
