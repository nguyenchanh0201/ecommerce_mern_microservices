const mongoose = require('mongoose');

// Define the Address Schema
const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
});

// Define the User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,   // Ensures the email is unique
        required: false,
        sparse: true
    },
    username: {
        type: String,
        unique: true,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        unique: true,   // Ensures phone number is unique
        required: false,
        sparse: true
    },
    password: {
        type: String,
        required: false,
    },
    facebookId: {
        type: String,
        required: false,
    },
    forgotPasswordCode: String,
    loginCode: String,
    verificationCode: String,
    isVerified: { type: Boolean, default: false },
    role: {
        type: Number,
        default: 2, // 1 for admin, 2 for user
    },
    addresses: [addressSchema], // Use addressSchema here
}, { timestamps: true });

// Ensure that the virtual field id is returned as a string instead of _id
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

// Create Models
const User = mongoose.model('User', userSchema);

module.exports =  User 
