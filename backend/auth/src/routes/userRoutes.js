const express = require('express')

const router = express.Router()

const UserController = require('../controllers/userController')

const userController = new UserController()

router.get('/', (req, res, next) => userController.getUsers(req, res, next))

router.get('/:id', (req, res, next) => userController.getUserById(req, res, next))

router.delete('/:userId', (req, res, next) => userController.deleteUser(req, res, next))

router.post('/', (req, res, next) => userController.createUser(req, res, next))


module.exports = router