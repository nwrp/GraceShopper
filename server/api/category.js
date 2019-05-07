const router = require('express').Router();
const { Category, Product } = require('../db/models');

// //GET /api/categories
// router.get('/', (req, res, next) => {
//   Category.findAll()
//     .then(categories => res.send(categories))
//     .catch(next);
// });

//GET /api/categories with color
router.get('/', (req, res, next) => {
  Category.findAll({
    include: [{ model: Product }]
  })
    .then(images => res.send(images))
    .catch(next);
});

module.exports = router;
