const conn = require('../db');

const ProductImage = conn.define('productImage', {
  imageUrl: {
    type: conn.Sequelize.STRING,
    defaultValue:
      'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjHk8nGxvDhAhVShuAKHUQ0Au0QjRx6BAgBEAU&url=https%3A%2F%2Fexcelequine.co.nz%2Fproduct-image-placeholder%2F&psig=AOvVaw2DsBJS8BfjB3cWmjz1mSUS&ust=1556464047119829',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = ProductImage;
