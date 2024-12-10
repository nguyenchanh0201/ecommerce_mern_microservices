const express = require('express');
const OrderController = require('../controllers/orderController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();
const orderController = new OrderController();

// Authenticated Routes
router.get('/user', isAuthenticated, (req, res, next) => 
  orderController.getOrderByUserId(req, res, next)
);

// Order CRUD Routes
router.get('/', (req, res, next) => 
  orderController.getOrders(req, res, next)
);

router.post('/', (req, res, next) => 
  orderController.createOrder(req, res, next)
);

router.get('/:id', (req, res, next) => 
  orderController.getOrderById(req, res, next)
);

router.put('/:id', (req, res, next) => 
  orderController.updateOrder(req, res, next)
);

router.delete('/:id', (req, res, next) => 
  orderController.deleteOrder(req, res, next)
);

module.exports = router;
