require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3001,
  mongoURI: process.env.MONGODB_PRODUCT_URI || "mongodb://localhost/products",
  rabbitMQURI: process.env.RABBITMQ_URI || "amqp://localhost",
  exchangeName: "products",
  queueName: "products_queue",
  // awsRegion: process.env.AWS_REGION,
  // awsAccessKey: process.env.AWS_ACCESS_KEY,
  // awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // awsBucketName: process.env.AWS_BUCKET_NAME,
};