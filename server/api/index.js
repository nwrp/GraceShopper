const router = require('express').Router();

router.use('/products', require('./product'));

router.use('/orders', require('./order'));

router.use('/auth', require('./auth'));

router.use('/categories', require('./category'));

router.use('/users', require('./users'));

module.exports = router;
