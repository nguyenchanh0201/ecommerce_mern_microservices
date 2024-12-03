const UserService = require('../services/userService')



class UserController {
    constructor() {
        this.UserService = new UserService()
    }

    async createUser(req, res, next) {
        try {
            const user = req.body 

            const result = await this.UserService.createUser(user)

            if (result.success) {
                return res.status(201).json({
                    success: true,
                    message: result.message || 'User created successfully'
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: result.message || 'Failed to create user'
                });
            }
        } catch(err) {
            next(err)
        }

    }

    async getUsers(req, res, next) {
        try {
            const result = await this.UserService.getUsers()

            
            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: result.message
                });
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: result.message || 'User not found'
                });
            }
        } catch(err) {
            next(err)
        }
        
    }


    async getUserById(req, res, next) {
        try {
            const userId = req.params.id 

            const result = await this.UserService.getUserById(userId);

            if (!result.success) {
                return res.status(404).json({
                    success: false,
                    message: result.message
                });
            }
            return res.status(200).json({
                success: true , 
                message: result.message
            })

            
        } catch(err) {
            next(err)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params 

            const result = await this.UserService.deleteUser(userId);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }
            return res.status(200).json({
                success: true , 
                message: result.message
            })
        }
        catch(err) {
            next(err)
        }
    }

    //Address
    async addUserAddress(req, res, next){
        try {
            const userId = 
        }
        
    }


    
}

module.exports = UserController