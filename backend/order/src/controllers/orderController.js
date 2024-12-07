const OrderService = require('../services/orderService');


class OrderController {
    constructor() {
        this.orderService = new OrderService();
    }

    async createOrder(req, res, next) {
        const { products, username, orderId, total } = req.body;

        try {
            const result = await this.orderService.createOrder(products, username, orderId, total);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getOrders(req, res, next) {
        try {
            const orders = await this.orderService.getOrders();

            if (!orders.length) {
                return res.status(404).json({ message: "No orders found" });
            }
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrderController;