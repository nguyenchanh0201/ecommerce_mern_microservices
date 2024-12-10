const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const MessageBroker = require("./utils/messageBroker");
const productsRoutes = require("./routes/productRoutes");
require("dotenv").config();
const {errorHandler} = require('./middlewares');
const morgan = require('morgan');
const path = require('path');

class App {
  constructor() {
    this.app = express();
    this.connectDB();
    this.setMiddlewares();
    this.setRoutes();
    this.setupMessageBroker();
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

  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(errorHandler);
    this.app.use(morgan('dev'))
  }

  setRoutes() {
    this.app.use("/", productsRoutes);
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  }

  setupMessageBroker() {
    MessageBroker.connect();
  }

  start() {
    this.server = this.app.listen(3001, () =>
      console.log("Server started on port 3001")
    );
  }

  async stop() {
    await mongoose.disconnect();
    this.server.close();
    console.log("Server stopped");
  }
}

module.exports = App;