const User = require("../models/user");

class UserRepository {

    async createUser(user) {
        return await User.create(user);
    }

    async getUserByUsername(username) {
        return await User.findOne({ username: username });
    }

    async getUserByEmail(email) {
        return await User.findOne({ email: email });
    }

    async getUserByPhoneNum(phone) {
        return await User.findOne({ phoneNumber: phone });
    }

    async save() {
        return await User.save();
    }


    async getUserByFacebook(facebookId) {
        return await User.findOne({ facebookId })
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete({ _id: userId });
    }


    async getUsers() {
        return await User.find();
    }

    async getUserById(id) {
        return await User.findOne({_id: id})
    }

    async save(user) {
        return await user.save()
    }

    

    
    
}

module.exports = UserRepository;