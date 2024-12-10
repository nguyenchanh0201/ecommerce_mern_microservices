const UserRepository = require('../repositories/userRepository')
const generateUsername = require('../utils/generateUsername')

class UserService {
    
    constructor() {
        this.UserRepository = new UserRepository()
    }

    async createUser(user) {
        let {email, phone, username, password, role} = user

        const isExistEmail = await this.UserRepository.getUserByEmail(email); 
        
        if (isExistEmail) {
            return {success: false , message: 'Email existed'}
        }

        const isExistPhone = await this.UserRepository.getUserByPhoneNum(phone);

        if (isExistPhone) {
            return {success: false , message : 'Phone number existed'}
        }

        if (!username) {
            username = await generateUsername()

        }
        if (!password) {
            const newUser = await this.UserRepository.createUser({email, phoneNumber: phone, username})
        }

        const newUser = await this.UserRepository.createUser({email, phoneNumber: phone, username, password, role})
        

        return {success: true , message : newUser};


    }

    async getUsers() {
        const result = await this.UserRepository.getUsers();

        if (!result) {
            return {success : false , message : 'User not found'}
        }

        return {success : true , message : result};
        
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

    async updateUser(userId, updateData) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return {success : false , message : "User not found"}
        }

        const {username, phoneNumber, name} = updateData;

        const isExistUsername = await this.UserRepository.getUserByUsername(username);

        if (isExistUsername) {
            return {success : false , message : "Username existed"}
        }

        const isExistPhone = await this.UserRepository.getUserByPhoneNum(phoneNumber);

        if (isExistPhone) {
            return {success : false , message : "Phone number existed"}
        }

        user.username = username || user.username;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.name = name || user.name;

        await this.UserRepository.save(user);

        return {success : true , message : "Update user success"};

    }

    async addUserAddress(userId, address) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return {success : false , message : "User not found"}
        }

        user.addresses.push(address);

        await this.UserRepository.save(user);

        return {success : true , message : "Add address success"};

    }

    async removeUserAddress(userId, addressId) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return {success : false , message : "User not found"}
        }

        const address = user.addresses.id(addressId);

        if (!address) {
            return { success: false, message: "Address not found" };
        }

        address.remove();

        await this.UserRepository.save(user);

        return {success : true , message : "Remove address success"};

    }

    async updateUserAddress(userId, index, address) {
        const user = await this.UserRepository.getUserById(userId);

        if (!user) {
            return {success : false , message : "User not found"}
        }

        const {name, street, city, district, ward, phoneNumber, isDefault} = address;

        user.addresses[index].name = name || user.addresses[index].name;
        user.addresses[index].street = street || user.addresses[index].street;
        user.addresses[index].city = city || user.addresses[index].city;
        user.addresses[index].district = district || user.addresses[index].district;
        user.addresses[index].ward = ward || user.addresses[index].ward;
        user.addresses[index].phoneNumber = phoneNumber || user.addresses[index].phoneNumber;
        user.addresses[index].isDefault = isDefault || user.addresses[index].isDefault;

        await this.UserRepository.save(user);

        return {success : true , message : "Update address success"};
    }
    



    
}

module.exports = UserService