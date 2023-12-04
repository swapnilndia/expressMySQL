const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.post('/add-user', userController.addUser);

router.get('/get-user', userController.getUser);

router.delete('/delete-user/:id', userController.deleteUser);

router.put('/update-user/:id', userController.updateUser);

module.exports = router;