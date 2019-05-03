const Product = require("./models/product");
const ProductImage = require("./models/productimage");
const Category = require("./models/category");
const User = require("./models/user");
const Order = require("./models/order");
const LineItem = require("./models/lineitem");
const {
  seedCategories,
  seedProducts,
  seedUsers,
  seedOrders,
  seedLineItems
} = require("./seed");
const conn = require("./db");

const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() => {
      seedCategories.map(cat => Category.create(cat));
    })
    .then(() => {
      return Promise.all(
        seedProducts.map(prod =>
          Product.create(prod).then(product =>
            prod.detailImages.map(img => {
              ProductImage.create({ imageUrl: img, productId: product.id });
            })
          )
        )
      );
    })
    .then(() => {
      seedUsers.map(user => User.create(user));
    })
    .then(() => {
      seedOrders.map(order => Order.create(order));
    })
    .then(() => {
      seedLineItems.map(lineitem => LineItem.create(lineitem));
    })
    .catch(error => {
      throw error;
    });
};

module.exports = syncAndSeed;
