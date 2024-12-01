const Address = require('../models/address')


class addressRepository {

    async create(address) {
        return await Address.create(address)
    }

    async save() {
        return await Address.save()
    }

    async delete(addressId) {
        return await Address.findByIdAndDelete({_id: addressId})
    }

    async update(addressId, updateData) {
        return await Address.findByIdAndUpdate({_id : addressId}, updateData)
    }

    async getByUserId(userId) {
        return await Address.find({userId})
    }
    
    async getById(id) {
        return await Address.findById({id})
    }


}

module.exports = addressRepository