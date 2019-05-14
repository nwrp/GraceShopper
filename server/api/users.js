const router = require('express').Router();
const { User } = require('../db/models');

//GET /api/users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  User.create(req.body)
    .then(newUser => {
      console.log(newUser)
      res.send(newUser)})
    .catch(next);
})

module.exports = router;
