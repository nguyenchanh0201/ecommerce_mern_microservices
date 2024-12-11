const Order = require("../models/order");
const amqp = require("amqplib");

class OrderService {
    async createOrder(products, username, orderId, total) {
        const newOrder = new Order({
            products,
            user: username,
            totalPrice: total,
          });

        await newOrder.save();

        const amqpServer = "amqp://localhost:5672";
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("products");

        // Send the saved order to the products queue
        const { user, products: savedProducts, totalPrice } = newOrder.toJSON();
        channel.sendToQueue(
          "products",
          Buffer.from(JSON.stringify({ orderId, user, products: savedProducts, totalPrice }))
        );

        return {success : true, message : "Order created successfully"};
    }

    async getOrders() {
        return await Order.find();
    }

    async getOrderById(orderId) {
        return await Order.findById(orderId);
    }

    async getOrderByUserId(userId) {
        return await Order.find({userId: userId});
    }

    async deleteOrder(orderId) {
        return await Order.findByIdAndDelete(orderId);
    }

    async changeOrderStatus(orderId, status) {
        return await Order.findByIdAndUpdate(orderId, {status: status}, {new: true});
    }

    async cancelOrder(orderId, userId) {
        return await Order.findOneAndUpdate({_id: orderId, userId: userId}, {status: "canceled"}, {new: true});
    }
    
}

module.exports = OrderService;