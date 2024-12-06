const express = require('express')

const router = express.Router()

const AuthController = require('../controllers/authController')
const authController = new AuthController()

const authMiddleware = require('../middlewares/authMiddleware')

//User Profile Routes
router.get("/profile", authMiddleware, (req, res, next) => authController.getUserProfile(req, res, next));
router.put("/profile", authMiddleware, (req, res, next) => authController.updateUserProfile(req, res, next));


//Address
router.get("/profile/address", authMiddleware, (req, res, next) => authController.getUserAddresses(req, res, next));
router.get("/profile/address/:addressId", authMiddleware, (req, res, next) => authController.getUserAddress(req, res, next));
router.post("/profile/address", authMiddleware, (req, res, next) => authController.addAddress(req, res, next));
router.put("/profile/address/:addressId", authMiddleware, (req, res, next) => authController.updateAddress(req, res, next));
router.delete("/profile/address/:addressId", authMiddleware, (req, res, next) => authController.deleteAddress(req, res, next));


module.exports = router