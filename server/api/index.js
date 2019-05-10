const router = require('express').Router();

router.use('/products', require('./product'));

router.use('/orders', require('./order'));

router.use('/auth', require('./auth'));

router.use('/categories', require('./category'));

router.use('/reviews', require('./productreviews'));

router.use('/users', require('./users'));

router.use('/cart', require('./cart'));

module.exports = router;
