const data = require("../data");
const Product = require("../models/Product");
const successResponse = require("./successController");
const faker = require("faker");

// const generateDummyProducts = async () => {
//   const dummyProducts = [];

//   for (let i = 0; i < 100; i++) {
//     const product = {
//       title: faker.commerce.productName(),
//       slug: faker.lorem.slug(),
//       description: faker.lorem.paragraph(),
//       price: faker.commerce.price(),
//       image: faker.image.urlLoremFlickr({ category: 'animals' }), // Unique placeholder image URL
//       category: faker.commerce.department(),
//       brand: faker.company.companyName(),
//       inStock: faker.datatype.boolean(),
//       quantity: faker.datatype.number({ min: 1, max: 100 }),
//     };

//     dummyProducts.push(product);
//   }

//   return dummyProducts;
// };

const seedProduct = async (req, res, next) => {
  try {
    // const dummyProducts = await generateDummyProducts();
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
