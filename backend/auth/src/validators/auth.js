const {check} = require('express-validator');

const loginValidator = [
    check("usernameOrEmail").notEmpty().withMessage("Email or Username is required"), 
    check("password").isLength({min : 8}).withMessage('Password must be 8 characters long').notEmpty().withMessage('Password is required') 
]


const signupValidator = [
    check("email").isEmail().withMessage("Invalid Email").notEmpty().withMessage("Please enter your email"),
    check("phoneNumber").isMobilePhone().withMessage("Invalid phone number").notEmpty().withMessage("Please enter your phone number"),
    check("username").notEmpty().withMessage("Please enter username"),
    check("password").isLength({min : 8}).withMessage('Password must be 8 characters long').notEmpty().withMessage('Password is required') 
]

const emailValidator  = [
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required")
]

const verifyUserValidator = [
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"), 
    check("code").notEmpty().withMessage("Code is required")
]



const verifyForgotPassword = [
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),  
    check("newPassword").isLength({min : 8}).withMessage('Password must be 8 characters long').notEmpty().withMessage('Repeat password is required')
]

const changePasswordValidator = [
    check("oldPassword").isLength({min : 8}).withMessage('Password must be 8 characters long').notEmpty().withMessage('Old password is required'),
    check("newPassword").isLength({min : 8}).withMessage('Password must be 8 characters long').notEmpty().withMessage('New password is required')
]


module.exports = {loginValidator, signupValidator, emailValidator, verifyUserValidator, verifyForgotPassword, changePasswordValidator}