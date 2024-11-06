const router = require('express').Router();
const authController = require('../controller/authController');
const todoController = require('../controller/todoController');

router.use(authController.protect);

router
  .route('/')
  .get(todoController.setUserIds, todoController.getallTodo)
  .post(todoController.setUserIds, todoController.CreateTodo);

router
  .route('/:id')
  .get(todoController.getTodo)
  .patch(todoController.UpdateTodo)
  .delete(todoController.DeleteTodo);

module.exports = router;
