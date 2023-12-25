const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: [true, "thumbnail is required"],
    },

    title: {
      type: String,
      required: [true, "title is required"],
    },

    content: {
      type: String,
      required: [true, "content is required"],
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    category: {
      type: String,
      required: [true, "category is required"],
    },

    tags: {
      type: [String],
      default: [],
    },

    likedBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    dislikedBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    views : {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
