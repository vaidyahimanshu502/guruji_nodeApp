const express = require('express');
const router = express.Router();

const { checkAuthentication } = require('../config/jwt_authentication');
const todoController = require('../controllers/todo_controller');
const userController = require('../controllers/user_controller');

router.post('/create', checkAuthentication,  todoController.createTodo);
router.get('/get-todo',  checkAuthentication,   todoController.getTodo);
router.put("/:id/update_status/:staus_id",checkAuthentication, todoController.updateTodoStatus);
router.put('/update_data/:id',checkAuthentication,   todoController.updateTodoData);
router.delete("/:id/delete_item", checkAuthentication,   todoController.deleteTodo);
router.get('/filter_task/:status',checkAuthentication,  todoController.filterTodo);

module.exports = router;