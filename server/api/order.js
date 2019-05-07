const router = require('express').Router();
const { Order, LineItem, Product, User } = require('../db/models');

// Post route needs to check if pending order exists (throw error if order exists)

router.post('/user/:id', (req, res, next) => {
    Order.create(req.body)
        .then(newOrder => res.send(newOrder))
        .catch(next)
})

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

//creates a new line item
router.post('/:id', async (req, res, next) => {
  try {
    const lineItem = await LineItem.create(req.body);
    const lineItemWithProd = await LineItem.findByPk(lineItem.id, {
    include: [ {model: Product}]
    })
    res.send(lineItemWithProd);
  }
  catch (er) {
     next(er);
  }
})

module.exports = router;
