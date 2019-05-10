const router = require('express').Router();

router.delete('/:productId', (req, res, next) => {
    if (!req.session.sessionCart) {
        const error = new Error('No current sessionCart');
        error.status = 401;
        return next(error);
    }
    const tempSessionCart = req.session.sessionCart;
    tempSessionCart.lineitems = tempSessionCart.lineitems.filter(item => parseInt(item.productId, 10) !== parseInt(req.params.productId, 10))
    if (tempSessionCart.lineitems.length > 0) {
        req.session.sessionCart = tempSessionCart;
        res.send(tempSessionCart);
    } else {
        req.session.sessionCart = {};
        res.send({});
    }
});

// Creates a cart session
router.post('/', (req, res, next) => {
    req.session.sessionCart = req.body;
    res.sendStatus(200);
});

// Pulls in cart from session if it exists
router.get('/', (req, res, next) => {
    if (!req.session.sessionCart) {
        const error = new Error('No current sessionCart');
        error.status = 401;
        return next(error);
    }
    res.send(req.session.sessionCart);
})

module.exports = router;
