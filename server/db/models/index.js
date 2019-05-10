const Product = require("./product");
const ProductImage = require("./productimage");
const Category = require("./category");
const User = require("./user");
const Order = require("./order");
const LineItem = require("./lineitem");
const ProductReview = require("./productreview");

Category.hasMany(Product);
Product.belongsTo(Category);
Product.hasMany(LineItem);
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
Order.belongsTo(User);
User.hasMany(Order);
Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);
ProductReview.belongsTo(Product);
Product.hasMany(ProductReview);
ProductReview.belongsTo(User);
User.hasMany(ProductReview);

module.exports = {
  Product,
  Category,
  User,
  LineItem,
  Order,
  ProductImage,
  ProductReview
};
