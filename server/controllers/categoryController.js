const createError = require("http-errors");
const slugify = require("slugify");
const Category = require("../models/Category");
const successResponse = require("./successController");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      throw createError(404, "no category found");
    }

    return successResponse(res, {
      statusCode: 200,
      payload: categories,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    // check if category already exists

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      throw createError(409, "category already exists");
    }

    if (!name) {
      throw createError(400, "name is required");
    }

    const newCategory = new Category({
      name,
      slug: slugify(name),
    });

    const category = await newCategory.save();

    return successResponse(res, {
      statusCode: 201,
      message: "category was created successfully",
      payload: category,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug });

    if (!category) {
      throw createError(404, "category not found with this slug");
    }

    return successResponse(res, {
      statusCode: 200,
      payload: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    const category = await Category.findOneAndUpdate(
      { slug },
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    if (!category) {
      throw createError(404, "category not found with this slug");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "category was updated successfully",
      payload: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOneAndDelete({ slug });

    if (!category) {
      throw createError(404, "category not found with this slug");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "category was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
