const Order = require("../models/order");

class OrderService {
    async createOrder() {
        const newOrder = new Order({
            products,
            user: username,
            totalPrice: products.reduce((acc, product) => acc + product.price, 0),
        });

        await newOrder.save();
    }
}

module.exports = OrderService;