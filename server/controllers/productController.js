const createError = require("http-errors");
const Product = require("../models/Product");
const successResponse = require("./successController");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const Category = require("../models/Category");

// const getAllProducts = async (req, res, next) => {

//   try {
//     const search = req.query.search ? req.query.search : "";
//     const { page = 1, limit = 6, minPrice, maxPrice, category } = req.query;

//     const searchRegExp = new RegExp(".*" + search + ".*", "i");

//     const filter = {
//       $or: [{ title: searchRegExp }, { brand: searchRegExp }],
//     };

//     if (minPrice) {
//     }

//     if (maxPrice) {
//       filter.price = { $lte: maxPrice };
//     }

//     if (category) {
//       // Find the category ObjectId by its name or identifier
//       const categoryObject = await Category.findOne({ slug: category });

//       if (categoryObject) {
//         filter.category = categoryObject._id;
//       } else {
//         // Handle the case where the category is not found
//         throw createError(404, "Category not found");
//        }
//     }

//     const products = await Product.find(filter)
//       .limit(limit)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 });

//     const count = await Product.find(filter).countDocuments();

//     if (!products || products.length === 0) {
//       throw createError(404, "No products found");
//     }

//     return successResponse(res, {
//       statusCode: 200,
//       payload: {
//         products,
//         totalProducts: count,
//         totalPages: Math.ceil(count / limit),
//         currentPage: page,
//         previousPage: page - 1,
//         nextPage: page + 1,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }

// };

const getAllProducts = async (req, res, next) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;

    if (!product || product.length === 0) {
      throw createError(404, "no product found");
    }

    return successResponse(res, {
      statusCode: 200,
      payload: product,
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

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
