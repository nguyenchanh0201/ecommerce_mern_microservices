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


    
}

module.exports = OrderService;