const router = require("express").Router();
const { ProductReview, User, Product } = require("../db/models");

//GET /api/reviews
router.get("/", (req, res, next) => {
  ProductReview.findAll({ include: [{ model: User }, { model: Product }] })
    .then(reviews => res.send(reviews))
    .catch(next);
});

module.exports = router;
