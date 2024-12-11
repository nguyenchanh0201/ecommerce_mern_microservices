const express = require('express');
const OrderController = require('../controllers/orderController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();
const orderController = new OrderController();

// Authenticated User Routes
router.get('/user', isAuthenticated, (req, res, next) => 
  orderController.getOrderByUserId(req, res, next)
);

// Order Retrieval Routes
router.get('/', (req, res, next) => 
  orderController.getOrders(req, res, next)
);

router.get('/:id', (req, res, next) => 
  orderController.getOrderById(req, res, next)
);

// Order Creation Route
router.post('/', (req, res, next) => 
  orderController.createOrder(req, res, next)
);

// Order Status Management Routes
router.patch('/:id', (req, res, next) => 
  orderController.changeOrderStatus(req, res, next)
);

router.patch('/:id/cancel', isAuthenticated, (req, res, next) => 
  orderController.cancelOrder(req, res, next)
);

// Order Deletion Route
router.delete('/:id', (req, res, next) => 
  orderController.deleteOrder(req, res, next)
);

module.exports = router;
