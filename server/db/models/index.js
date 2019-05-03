const Product = require("./product");
const ProductImage = require("./productimage");
const Category = require("./category");
const User = require("./user");
const Order = require("./order");
const LineItem = require("./lineitem");

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

module.exports = {
  Product,
  Category,
  User,
  LineItem,
  Order,
  ProductImage
};
