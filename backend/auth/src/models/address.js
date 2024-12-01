const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
    }
    ,
    { timestamps: true }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
