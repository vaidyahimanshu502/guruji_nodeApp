const express = require('express');
const router = express.Router();
const user = require('./user');
const Todo = require('./todo');

router.use('/user', user);
router.use('/todo', Todo);

module.exports=router;