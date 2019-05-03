const router = require('express').Router();
const { Order, LineItem, Product, User } = require('../db/models');

// Post route needs to check if pending order exists (throw error if order exists)

// Returns user's orders
router.get('/user/:id', (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (user.isAdmin) {
                Order.findAll({
                    include: [
                        {model: LineItem, include: [
                            {model: Product}
                        ]}
                    ]
                })
                    .then(orders => res.send(orders))
                    .catch(next);
            } else {
                Order.findAll({
                    where: {
                        userId: req.params.id
                    },
                    include: [
                        {model: LineItem, include: [
                            {model: Product}
                        ]}
                    ]
                })
                    .then(orders => res.send(orders))
                    .catch(next);
            }
        })
})

// Returns individual order where id === route id
router.get('/:id', (req, res, next) => {
    Order.findByPk(req.params.id, {
        include: [
            {model: LineItem, include: [
                {model: Product}
            ]}
        ]
    })
        .then(order => res.send(order))
        .catch(next);
});

// Returns all oders with line items and respective product details
router.get('/', (req, res, next) => {
    Order.findAll({
        include: [
            {model: LineItem, include: [
                {model: Product}
            ]}
        ]
    })
        .then(orders => res.send(orders))
        .catch(next);
});

module.exports = router;
