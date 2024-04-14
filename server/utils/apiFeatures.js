class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.originalQuery = { ...query.getQuery() }; // Store the original query
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

    // Filter by category
    if (queryCopy.category && queryCopy.category !== "") {
      if (queryCopy.category.includes(',')) {
        const categories = queryCopy.category.split(",");
        queryCopy.category = { $in: categories };
      } else {
        queryCopy.category = { $eq: queryCopy.category };
      }
    } else {
      delete queryCopy.category;
    }

    // Filter by brand
    if (queryCopy.brand && queryCopy.brand !== "") {
      if (queryCopy.brand.includes(',')) {
        const brands = queryCopy.brand.split(",");
        queryCopy.brand = { $in: brands };
      } else {
        queryCopy.brand = { $eq: queryCopy.brand };
      }
    } else {
      delete queryCopy.brand;
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

module.exports = ApiFeatures;
