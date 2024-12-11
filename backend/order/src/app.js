const express = require("express");
const mongoose = require("mongoose");
const Order = require('./models/order');

const config = require("./config/index");
const errorHandler = require('./middlewares/errorHandler');
const orderRoutes = require('./routes/orderRoutes');
const amqp = require("amqplib");

class App {
  constructor() {
    this.app = express();
    this.connectDB();
    this.setupOrderConsumer();
    this.setMiddlewares();
    this.setRoutes();
  }

  async connectDB() {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  }

  async disconnectDB() {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }

  async setRoutes() {
    this.app.use("/", orderRoutes);
  }

  async setupOrderConsumer() {
    console.log("Connecting to RabbitMQ...");
  
    setTimeout(async () => {
        try {
            const amqpServer = "amqp://rabbitmq:5672";
            const connection = await amqp.connect(amqpServer);
            console.log("Connected to RabbitMQ");
            const channel = await connection.createChannel();
            await channel.assertQueue("orders");
  
            channel.consume("orders", async (data) => {
                try {
                    // Consume messages from the order queue
                    console.log("Consuming ORDER service");
                    const { products, quantities, userId, orderId, total } = JSON.parse(data.content);

                    // Validate data
                    if (!Array.isArray(products) || !Array.isArray(quantities) || products.length !== quantities.length) {
                        console.error("Invalid data: products and quantities must be arrays of the same length.");
                        channel.nack(data); // Negative acknowledgment for invalid messages
                        return;
                    }

                    // Create and save new order
                    const newOrder = new Order({
                        products,
                        quantities, // Store the quantities as well
                        userId,
                        totalPrice: total, // Store total price
                    });
                    await newOrder.save();

                    // Send ACK to the orders queue
                    channel.ack(data);
                    console.log("Order saved to DB and ACK sent to ORDER queue");
  
                    // Send fulfilled order to PRODUCTS service
                    const { userId: savedUser, products: savedProducts, quantities: savedQuantities, totalPrice } = newOrder.toJSON();
                    channel.sendToQueue(
                        "products",
                        Buffer.from(JSON.stringify({
                            orderId,
                            userId: savedUser,
                            products: savedProducts,
                            quantities: savedQuantities, // Include quantities
                            totalPrice,
                        }))
                    );
                } catch (err) {
                    console.error("Error processing order:", err.message);
                    channel.nack(data); // Negative acknowledgment for processing errors
                }
            });
        } catch (err) {
            console.error("Failed to connect to RabbitMQ:", err.message);
        }
    }, 10000); // Add a delay to wait for RabbitMQ to start in Docker Compose
}



  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(errorHandler);
  }


  start() {
    
    this.server = this.app.listen(config.port, () =>
      console.log(`Server started on port ${config.port}`)
    );
  }

  async stop() {
    await mongoose.disconnect();
    this.server.close();
    console.log("Server stopped");
  }
}

module.exports = App;