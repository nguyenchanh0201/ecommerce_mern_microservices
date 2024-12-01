const jwt = require('jsonwebtoken'); 
const {jwtSecret} = require('../config/index')


const generateToken = (user) => {
    const token = jwt.sign(
        {
        _id : user._id ,
          email : user.email,
           role : user.role, 
        }, 
        jwtSecret, 
        {expiresIn:"7d"}
    )
        return token ; 
}



module.exports = generateToken ;