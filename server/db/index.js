const Product = require("./models/product");
const ProductImage = require("./models/productimage");
const ProductReview = require("./models/productreview");
const Category = require("./models/category");
const User = require("./models/user");
const Order = require("./models/order");
const LineItem = require("./models/lineitem");
const {
  seedCategories,
  seedProducts,
  seedUsers,
  seedOrders,
  seedLineItems,
  seedReviews
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
      return Promise.all(seedUsers.map(user => User.create(user)))
        .then(() => {
          return Promise.all(seedOrders.map(order => Order.create(order)));
        })
        .then(() => {
          return Promise.all(
            seedLineItems.map(lineitem => LineItem.create(lineitem))
          );
        })
        .then(() => {
          return Promise.all(
            seedReviews.map(review => ProductReview.create(review))
          );
        });
    });
};

module.exports = syncAndSeed;
