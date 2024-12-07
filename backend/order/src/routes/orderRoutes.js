const OrderController = require('../controllers/orderController');
const express = require('express');

const router = express.Router();

const orderController = new OrderController();

router.get('/', (req, res, next) => orderController.getOrders(req, res, next));
router.post('/', (req, res, next) => orderController.createOrder(req, res, next));


module.exports = router;