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

    async getOrderById(req, res, next) {
        const orderId = req.params.id;

        try {
            const order = await this.orderService.getOrderById(orderId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }

    async getOrderByUserId(req, res, next) {
        const userId = req.user._id

        try {
            const orders = await this.orderService.getOrderByUserId(userId);

            if (!orders.length) {
                return res.status(404).json({ message: "No orders found" });
            }
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    async deleteOrder(req, res, next) {
        const orderId = req.params.id;

        try {
            const order = await this.orderService.deleteOrder(orderId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            next(error);
        }
    }

    async changeOrderStatus(req, res, next) {
        const orderId = req.params.id;
        const { status } = req.body;

        try {
            const order = await this.orderService.changeOrderStatus(orderId, status);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }

    async cancelOrder(req, res, next) {
        const orderId = req.params.id;
        const userId = req.user._id;

        try {
            const order = await this.orderService.cancelOrder(orderId, userId);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }


}

module.exports = OrderController;