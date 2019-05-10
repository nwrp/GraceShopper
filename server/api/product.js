const Sequelize = require('sequelize');
const router = require('express').Router();
const { Product, ProductImage } = require('../db/models');

//GET /api/products
router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

//GET /api/productsWithCount
router.get('/productsWithCount/:index?', (req, res, next) => {
  const countAndProducts = {};
  Product.count()
    .then(records => {
      countAndProducts.count = records;
    })
    .then(() => {
      Product.findAll({
        offset: 10 * (req.params.index ? req.params.index * 1 : 0),
        limit: 10,
        order: [['categoryId', 'ASC'], ['title', 'ASC']],
      })
        .then(products => {
          countAndProducts.products = products;
        })
        .then(() => {
          res.send(countAndProducts);
        })
        .catch(next);
    })
    .catch(next);
});

//GET /api/productsWithCount/category
router.get(
  '/productsWithCount/filter/category/:categoryId?/:index?',
  (req, res, next) => {
    const countAndProducts = {};
    Product.count(
      req.params.categoryId && req.params.categoryId !== '0'
        ? {
            where: {
              categoryId: req.params.categoryId * 1,
            },
          }
        : {}
    )
      .then(records => {
        countAndProducts.count = records;
      })
      .then(() => {
        Product.findAll(
          req.params.categoryId && req.params.categoryId !== '0'
            ? {
                where: {
                  categoryId: req.params.categoryId * 1,
                },
                offset: 10 * (req.params.index ? req.params.index * 1 : 0),
                limit: 10,
                order: [['categoryId', 'ASC'], ['title', 'ASC']],
              }
            : {
                offset: 10 * (req.params.index ? req.params.index * 1 : 0),
                limit: 10,
                order: [['categoryId', 'ASC'], ['title', 'ASC']],
              }
        )
          .then(products => {
            countAndProducts.products = products;
          })
          .then(() => {
            res.send(countAndProducts);
          })
          .catch(next);
      })
      .catch(next);
  }
);

//GET /api/productsWithCount/category/searchTerm
router.get(
  '/productsWithCount/search/category/:categoryId/term/:searchTerm?/:index?',
  (req, res, next) => {
    const countAndProducts = {};
    Product.count(
      req.params.categoryId && req.params.categoryId !== '0'
        ? {
            where: {
              categoryId: req.params.categoryId * 1,
              [Sequelize.Op.or]: [
                {
                  title: {
                    [Sequelize.Op.iLike]: `%${
                      req.params.searchTerm ? req.params.searchTerm : ''
                    }%`,
                  },
                },
              ],
            },
          }
        : {
            where: {
              [Sequelize.Op.or]: [
                {
                  title: {
                    [Sequelize.Op.iLike]: `%${
                      req.params.searchTerm ? req.params.searchTerm : ''
                    }%`,
                  },
                },
              ],
            },
          }
    )
      .then(records => {
        countAndProducts.count = records;
      })
      .then(() => {
        Product.findAll(
          req.params.categoryId && req.params.categoryId !== '0'
            ? {
                where: {
                  categoryId: req.params.categoryId * 1,
                  [Sequelize.Op.or]: [
                    {
                      title: {
                        [Sequelize.Op.iLike]: `%${
                          req.params.searchTerm ? req.params.searchTerm : ''
                        }%`,
                      },
                    },
                  ],
                },
                offset: 10 * (req.params.index ? req.params.index * 1 : 0),
                limit: 10,
                order: [['categoryId', 'ASC'], ['title', 'ASC']],
              }
            : {
                where: {
                  [Sequelize.Op.or]: [
                    {
                      title: {
                        [Sequelize.Op.iLike]: `%${
                          req.params.searchTerm ? req.params.searchTerm : ''
                        }%`,
                      },
                    },
                  ],
                },
                offset: 10 * (req.params.index ? req.params.index * 1 : 0),
                limit: 10,
                order: [['categoryId', 'ASC'], ['title', 'ASC']],
              }
        )
          .then(products => {
            countAndProducts.products = products;
          })
          .then(() => {
            res.send(countAndProducts);
          })
          .catch(next);
      })
      .catch(next);
  }
);

//GET /api/products
router.get('/:productId', (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => res.send(product))
    .catch(next);
});

//GET /api/products/productId/productimagesId
router.get('/productImages', (req, res, next) => {
  ProductImage.findAll({
    include: [{ model: Product }],
  })
    .then(images => res.send(images))
    .catch(next);
});

//POST /api/products
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

//PUT /api/products
router.put('/', (req, res, next) => {
  Product.findByPk(req, params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next);
});

//DELETE /api/products
router.delete('/', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
