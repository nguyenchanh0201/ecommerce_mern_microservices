const UserRepository = require('../repositories/userRepository')
const generateUsername = require('../utils/generateUsername')

class UserService {
    
    constructor() {
        this.UserRepository = UserRepository;
    }

    async createUser(user) {
        const {email, phone, username} = user

        const isExistEmail = await this.UserRepository.getUserByEmail(email); 
        
        if (isExistEmail) {
            return {success: false , message: 'Email existed'}
        }

        const isExistPhone = await this.UserRepository.getUserByPhone(phone);

        if (isExistPhone) {
            return {success: false , message : 'Phone number existed'}
        }

        if (!username) {
            username = generateUsername()
        }

        const newUser = await this.UserRepository.createUser({email, phoneNum: phone, username})

        return {success: true , message : newUser};


    }

    async getUsers() {
        const result =  await this.UserRepository.getUsers();

        if (!result) {
            return {success : false , message : 'Users is empty'}
        }

        return result ; 
    }

    async getUserById(userId) {
        const result =  await this.UserRepository.getUserById(userId); 

        if (!result) {
            return {success: false , message: 'User not found'}
        }
        return {success : true , message : result };

    }


    async deleteUser(userId) {
        const result =  await this.UserRepository.deleteUser(userId)

        if (!result) {
            return {success : false , message : "User not found"}
        }
        return {success : true , message : 'User deleted'};

    }

    async updateUsername(userId, username) {
        const result =  await this.UserRepository.updateUsername(userId, username)

        if (!result) {
            return {success : false , message : "User not found"}
        }
        return {success : true , message : result};
    }
    
    


    
}