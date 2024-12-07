const jwt = require("jsonwebtoken");
require("dotenv").config();

function isAuthenticated(req, res, next) {
  // Check for the presence of an authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = isAuthenticated;