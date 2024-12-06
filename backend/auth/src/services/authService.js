const UserRepository = require('../repositories/userRepository')

const { hashPwd } = require('../utils/hashedPassword');

const comparePassword = require('../utils/comparePassword');

const generateToken = require("../utils/generateToken");

const generateCode = require("../utils/generateOTP")

const sendEmail = require("../utils/sendEmail")

class AuthService {

    constructor() {
        this.UserRepository = new UserRepository();
    }

    //Having middleware to check credentials
    async signIn(credentials) {
        const { usernameOrEmail, password } = credentials;

        let user;


        try {
            if (usernameOrEmail.includes('@')) {
                user = await this.UserRepository.getUserByEmail(usernameOrEmail);
            } else {
                user = await this.UserRepository.getUserByUsername(usernameOrEmail);
            }

            if (!user) {
                return { success: false, message: 'User not found.' };
            }

            const match = await comparePassword(password, user.password)

            if (!match) {
                return { success: false, message: 'Invalid Credentials' }
            }

            if (!user.isVerified) {
                return { success: false, message: 'Please verify your account' }
            }

            const token = generateToken(user);

            return {
                success: true,
                token,
                user: { _id: user._id, email: user.email, username: user.username, role: user.role },
            };

        } catch (error) {
            console.error('Error during signIn:', error);
            return { success: false, message: 'Something went wrong. Please try again later.' };
        }
    }



    async signUp(credentials) {

        try {
            const { email, phoneNumber, username, password } = credentials;

            const isExisted = await this.UserRepository.getUserByEmail(email);

            if (isExisted) {
                return { success: false, message: "Email existed" }
            }

            const hashedPassword = await hashPwd(password);
            const newUser = { email, phoneNumber, username, password: hashedPassword, facebookId: null };


            const createdUser = await this.UserRepository.createUser(newUser);

            if (createdUser) {
                return { success: true, message: "User created successfully" };
            } else {
                return { success: false, message: "Failed to create user. Please try again." };
            }


        }

        catch (error) {
            console.error('Error during signUp:', error);
            return { success: false, message: 'Something went wrong. Please try again later.' };
        }



    }

    async verifyEmail(email) {

        const user = await this.UserRepository.getUserByEmail(email);

        if (!user) {
            return { success: false, message: "User not found" }
        }

        if (user.isVerified) {
            return { success: false, message: "User has been verified" }
        }

        const code = generateCode()

        user.verificationCode = code

        await this.UserRepository.save(user)

        await sendEmail({
            emailTo: user.email,
            subject: "Email verification code",
            code,
            content: "verify your account",
        })

        return { success: true, message: "User email verification sent successfully" }



    }

    async verifyUser(email, code) {
        const user = await this.UserRepository.getUserByEmail(email);

        if (!user) {
            return { success: false, message: "User not found" }
        }

        if (user.verificationCode !== code) {
            return { success: false, message: "Invalid code" }
        }

        user.isVerified = true;
        user.verificationCode = null;

        await this.UserRepository.save(user);

        return { success: true, message: "User verified successfully" }


    }

    async sendForgotPassword(email) {
        const user = await this.UserRepository.getUserByEmail(email);

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const code = generateCode()
        user.forgotPasswordCode = code;

        await this.UserRepository.save(user);

        await sendEmail({
            emailTo: user.email,
            subject: "Reset your password",
            code,
            content: "Use this code to reset your password",
        })

        return { success: true, message: "Reset code sent successfully" };
    }

    async verifyResetCode(email, code) {
        const user = await this.UserRepository.getUserByEmail(email);

        if (!user) {
            return { success: false, message: "User not found" };
        }

        if (user.forgotPasswordCode !== code) {
            return { success: false, message: "Invalid code" };
        }

        return { success: true, message: "Code verified successfully" };
    }




    async resetPassword(email, newPassword) {
        const user = await this.UserRepository.getUserByEmail(email);

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const hashedPassword = await hashPwd(newPassword);
        user.password = hashedPassword;
        await this.UserRepository.save(user)

        return { success: true, message: "Password has been reset successfully" };

    }

    async changePassword(userId, oldPassword, newPassword) {

        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const match = await comparePassword(oldPassword, user.password);

        if (!match) {
            return { success: false, message: "Invalid password" }
        }

        const hashedPassword = await hashPwd(newPassword);
        user.password = hashedPassword;
        await this.UserRepository.save(user)

        return { success: true, message: "Password has been changed successfully" };

    }

    async sendLoginOTP(email) {
        const user = await this.UserRepository.getUserByEmail(email);

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const code = generateCode()

        user.loginCode = code;

        await this.UserRepository.save(user);

        await sendEmail({
            emailTo: user.email,
            subject: "Login OTP",
            code,
            content: "Use this code to login",
        })

        return { success: true, message: "Login code sent successfully" };
    }

    async loginOTP(email, code) {
        const user = await this.UserRepository.getUserByEmail(email);

        if (!user) {
            return { success: false, message: "User not found" };
        }

        if (user.loginCode !== code) {
            return { success: false, message: "Invalid code" };
        }

        const token = generateToken(user);

        return {
            success: true,
            token,
            user: { _id: user._id, email: user.email, username: user.username, role: user.role },
        }
    }




    async addUserAddress(userId, address) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return { success: false, message: "User not found" }
        }

        user.addresses.push(address);

        await this.UserRepository.save(user);

        return { success: true, message: "Add address success" };

    }

    async removeUserAddress(userId, addressId) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return { success: false, message: "User not found" }
        }

        const originalLength = user.addresses.length;
        user.addresses = user.addresses.filter(
            (address) => address._id.toString() !== addressId
        );

        if (user.addresses.length === originalLength) {
            return { success: false, message: "Address not found" };
        }

        await this.UserRepository.save(user);

        return { success: true, message: "Remove address success" };

    }

    async updateUserAddress(userId, addressId, address) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return { success: false, message: "User not found" }
        }

        const { name, street, city, district, ward, phoneNumber, isDefault } = address;

        const userAddress = user.addresses.id(addressId);
        if (!userAddress) {
            return { success: false, message: "Address not found" };
        }

        // Update fields with nullish coalescing operator
        userAddress.name = name ?? userAddress.name;
        userAddress.street = street ?? userAddress.street;
        userAddress.city = city ?? userAddress.city;
        userAddress.district = district ?? userAddress.district;
        userAddress.ward = ward ?? userAddress.ward;
        userAddress.phoneNumber = phoneNumber ?? userAddress.phoneNumber;
        userAddress.isDefault = isDefault ?? userAddress.isDefault;


        await this.UserRepository.save(user);

        return { success: true, message: "Update address success" };
    }


    async updateUser(userId, updateData) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return { success: false, message: "User not found" }
        }

        const { username, phoneNumber, name } = updateData;

        const isExistUsername = await this.UserRepository.getUserByUsername(username);

        if (isExistUsername) {
            return { success: false, message: "Username existed" }
        }

        const isExistPhone = await this.UserRepository.getUserByPhoneNum(phoneNumber);

        if (isExistPhone) {
            return { success: false, message: "Phone number existed" }
        }

        user.username = username || user.username;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.name = name || user.name;

        await this.UserRepository.save(user);

        return { success: true, message: "Update user success" };

    }


    async getUserProfile(userId) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return { success: false, message: "User not found" }
        }

        return { success: true, user }
    }



    async getUserAddresses(userId) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return { success: false, message: "User not found" }
        }

        return { success: true, addresses: user.addresses }
    }

    async getUserAddress(userId, addressId) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return { success: false, message: "User not found" }
        }

        const address = user.addresses.id(addressId);

        return { success: true, address: address }
    }





}

module.exports = AuthService