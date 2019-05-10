const router = require('express').Router();
const { ProductReview, User } = require('../db/models');

//GET /api/reviews
router.get('/', (req, res, next) => {
  ProductReview.findAll({ include: [{ model: User }] })
    .then(reviews => res.send(reviews))
    .catch(next);
});

module.exports = router;
