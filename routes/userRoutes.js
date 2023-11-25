const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

router.route('/updateSelf')
.patch(usersController.updateSelf)

router.route('/:id')
.get(usersController.getUser)

router.route('/delete/:id')
.delete(usersController.deleteUser)

module.exports = router