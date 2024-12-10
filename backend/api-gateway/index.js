const express = require("express");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();
const app = express();
const cors = require('cors');

const morgan = require("morgan");
app.use(morgan("dev"));
require("dotenv").config();

app.use(cors({
    origin: process.env.FRONTEND_URL, // Specify allowed origins
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
  }));

app.use("/products", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3001" });
});

// Route requests to the order service
app.use("/orders", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3002" });
});
// Route requests to the auth service
app.use("/", (req, res) => {
    proxy.web(req, res, { target: "http://localhost:3000" });
});

// Route requests to the product service


// Start the server
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`API Gateway listening on port ${port}`);
});