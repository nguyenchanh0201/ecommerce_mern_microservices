require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_AUTH_URI,
  jwtSecret: process.env.JWT_SECRET || "secret",
  userEmail: process.env.USER_EMAIL , 
  password: process.env.PASSWORD,
  facebook_client_id: process.env.FACEBOOK_CLIENT_ID,
  facebook_secret_key: process.env.FACEBOOK_SECRET_KEY,
  facebook_callback_url: process.env.FACEBOOK_CALLBACK_URL,
  
};