const AuthService = require('../services/authService')

class AuthController {
    constructor() {
        this.AuthService = new AuthService();
    }

    async signIn(req, res, next) {

        try {
            const credentials = req.body
            const result = await this.AuthService.signIn(credentials)

            if (result.success) {
                res.json({ token: result.token });
            } else {
                res.status(400).json({ message: result.message });
            }
        } catch (err) {
            next(err)
        }
    }

    async signUp(req, res, next) {
        try {
            const credentials = req.body
            const result = await this.AuthService.signUp(credentials)

            if (result.success) {
                return res.status(201).json({
                    success: true,
                    message: result.message || 'User created successfully'
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: result.message || 'Failed to create user'
                });
            }


        } catch (err) {
            next(err)
        }
    }

    async verifyEmail(req, res, next) {
        try {
            const {email} = req.body ;
            const result = await this.AuthService.verifyEmail(email);

            if (result.success) {
                return res.status(201).json({
                    success: true,
                    message: result.message
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: result.message 
                });
            }
            
        } catch(err) {
            next(err)
        }
    }

    async verifyUser(req, res, next) {
        try {
            const {email, code} = req.body ; 
            const result = await this.AuthService.verifyUser(email, code) ; 

            if (result.success) {
                return res.status(201).json({
                    success: true,
                    message: result.message
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: result.message 
                });
            }

        } catch(err) {
            next(err)
        }
    }

    async resetPassword(req, res, next) {
        try {
            const {email, newPassword} = req.body ; 

            const result = await this.AuthService.resetPassword(email, newPassword);
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message 
            });

        } catch (err) {
            next(err);
        }

    }

    async changePassword(req, res, next) {
        try {
            const {oldPassword, newPassword} = req.body ; 
            const {_id} = req.user

            const result = await this.AuthService.changePassword(_id, oldPassword, newPassword);
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message 
            });

        } catch (err) {
            next(err);
        }

    }

    async sendLoginOTP(req, res, next) {
        try {
            const {email} = req.body ; 

            const result = await this.AuthService.sendLoginOTP(email);
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message 
            });

        } catch (err) {
            next(err);
        }

    }

    async loginOTP(req, res ,next) {
        try {
            const {email, code} = req.body ; 

            const result = await this.AuthService.loginOTP(email, code);
            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message,
                token: result.token 
            });

        } catch (err) {
            next(err);
        }
    }




}

module.exports = AuthController;