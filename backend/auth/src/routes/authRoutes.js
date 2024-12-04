const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const {loginValidator, signupValidator, emailValidator, verifyUserValidator, verifyForgotPassword, changePasswordValidator} = require('../validators/auth')
const validate = require('../validators/validate')
const AuthController = require('../controllers/authController')




const authController = new AuthController()

//Auth Routes
router.post("/signin", loginValidator, validate, (req, res, next) => authController.signIn(req, res, next));
router.post("/signup", signupValidator, validate, (req, res, next) => authController.signUp(req, res, next));
router.post("/send-email", emailValidator, validate, (req, res, next ) => authController.verifyEmail(req, res, next))
router.post("/verify-email", verifyUserValidator, validate, (req, res, next ) => authController.verifyUser(req, res, next))
router.post("/reset-password", verifyForgotPassword, validate,  (req, res, next) => authController.resetPassword(req, res, next))
router.put("/change-password", changePasswordValidator, validate, authMiddleware, (req, res, next) => authController.changePassword(req, res, next))
router.post("/send-login-otp", emailValidator, validate, (req, res, next) => authController.sendLoginOTP(req, res, next))
router.post("/loginOTP", verifyUserValidator, validate, (req, res, next) => authController.loginOTP(req, res, next))






module.exports = router


