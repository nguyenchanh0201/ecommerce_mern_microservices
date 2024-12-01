const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const morgan = require('morgan')
const authMiddleware = require("./middlewares/authMiddleware");
const AuthController = require("./controllers/authController");
const {errorHandler} = require('./middlewares')
const {loginValidator, signupValidator, emailValidator, verifyUserValidator, verifyForgotPassword} = require('./validators/auth')
const validate = require('./validators/validate'); 

class App {
    constructor() {
        this.app = express();
        this.authController = new AuthController();
        this.connectDB();
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

    setMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(errorHandler)
        this.app.use(morgan('dev'))
    }

    setRoutes() {
        this.app.post("/signin", loginValidator, validate, (req, res, next) => this.authController.signIn(req, res, next));
        this.app.post("/signup", signupValidator, validate, (req, res, next) => this.authController.signUp(req, res, next));
        this.app.post("/send-email", emailValidator, (req, res, next ) => this.authController.verifyEmail(req, res, next))
        this.app.post("/verify-email", verifyUserValidator, (req, res, next ) => this.authController.verifyUser(req, res, next))
        this.app.post("/reset-password", authMiddleware, verifyForgotPassword, validate,  (req, res, next) => this.authController.resetPassword(req, res, next))
        // this.app.get("/", authMiddleware, (req, res) => res.json({ message: "Welcome to dashboard" }));
    }

    start() {
        this.server = this.app.listen(3000, () => console.log("Server started on port 3000"));
    }

    async stop() {
        await mongoose.disconnect();
        this.server.close();
        console.log("Server stopped");
    }
}

module.exports = App;