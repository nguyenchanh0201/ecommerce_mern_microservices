require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_AUTH_URI,
  jwtSecret: process.env.JWT_SECRET || "secret",
  userEmail: process.env.USER_EMAIL , 
  password: process.env.PASSWORD
  
};