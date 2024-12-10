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
  process.env.FRONTEND_URL, // Example: http://localhost:3000
    process.env.ADMIN_URL
];

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
    methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
  })
);

// Route requests to the product service
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

// Start the server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
