const faker = require("faker");
const fs = require("fs");
const Product = require("../models/Product");
const generateDummyProduct = () => ({
  title: faker.commerce.productName(),
  slug: faker.lorem.slug(),
  description: faker.lorem.paragraph(),
  price: faker.datatype.number({ min: 10, max: 500 }),
  image: faker.image.imageUrl(),
  category: faker.commerce.department(),
  brand: faker.company.companyName(),
  inStock: faker.random.boolean(),
  quantity: faker.datatype.number({ min: 1, max: 100 }),
  sold: faker.random.number({ min: 0, max: 50 }),
  ratings: Array.from({ length: faker.datatype.number({ min: 0, max: 10 }) }, () => ({
    star: faker.datatype.number({ min: 1, max: 5 }),
    comment: faker.lorem.sentence(),
    postedBy: faker.random.uuid(),
  })),
  totalRatings: faker.datatype.number({ min: 0, max: 100 }),
});

const generateDummyProducts = (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push(generateDummyProduct());
  }
  return products;
};

const saveDummyProducts = async () => {
  const dummyProducts = generateDummyProducts(100);

  try {
    await Product.create(dummyProducts);
    console.log("Dummy products created successfully.");
  } catch (error) {
    console.error("Error creating dummy products:", error);
  }
};

saveDummyProducts();
