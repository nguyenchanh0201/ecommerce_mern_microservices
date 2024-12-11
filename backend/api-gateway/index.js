const express = require("express");
const httpProxy = require("http-proxy");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const proxy = httpProxy.createProxyServer();
const app = express();

app.use(morgan("dev"));

// List of allowed origins
const allowedOrigins = [
  "http://localhost:5173", // Browser access to frontend
  "http://localhost:3030", // Browser access to admin
  process.env.FRONTEND_URL, // Docker service frontend URL
  process.env.ADMIN_URL,    // Docker service admin URL
];


const productURL = process.env.PRODUCT_URL; // Example: http://localhost:3001
const orderURL = process.env.ORDER_URL;     // Example: http://localhost:3002
const authURL = process.env.AUTH_URL;       // Example: http://localhost:3000

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE,PATCH", // Specify allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
  })
);

// Route requests to the product service
app.use("/products", (req, res) => {
  proxy.web(req, res, { target: productURL });
});

// Route requests to the order service
app.use("/orders", (req, res) => {
  proxy.web(req, res, { target: orderURL });
});

// Route requests to the auth service
app.use("/", (req, res) => {
  proxy.web(req, res, { target: authURL });
});

// Start the server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
