const conn = require('../db');

const ProductReview = conn.define('productreview', {
  rating: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  review: {
    type: conn.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = ProductReview;
