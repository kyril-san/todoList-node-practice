const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/signup', userController.CreateUser);

router.post('/login', userController.LoginUser);

router.route('/').get(userController.GetallUser);

router.route('/:id').get(userController.GetUser);

module.exports = router;
