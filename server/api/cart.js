const router = require('express').Router();

// Creates a cart session using only id as reference
router.post('/', (req, res, next) => {
    req.session.sessionCart = req.body;
    res.sendStatus(200)
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
