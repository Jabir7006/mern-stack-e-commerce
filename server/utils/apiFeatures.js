class apiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.search
      ? {
          title: {
            $regex: this.queryString.search,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };

    const removeFields = ["search", "limit", "page", "sort"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // Check if the 'category' field exists and is not empty in the query string
    if (queryCopy.category && queryCopy.category !== "") {
      queryCopy.category = { $eq: queryCopy.category }; // Use $eq for exact match
    } else {
      // If 'category' is not defined or is empty, exclude the 'category' filter
      delete queryCopy.category;
    }

    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = apiFeatures;
