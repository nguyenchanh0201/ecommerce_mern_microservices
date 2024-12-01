const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    //get
    email: {
        type: String,
        unique: true,   // Đảm bảo email là duy nhất
        required: false,
    },

    //get
    username: {
        type: String,
        unique: true,
        required: false
    },

    name: {
        type: String,
        required: false
    },


    //get
    phoneNumber: {
        type: String,
        unique: true,   // Đảm bảo số điện thoại là duy nhất
        required: false,
    },
    password: {
        type: String,
        required: false,
    },

    ///Social Media Login
    //get
    
    facebookId: {
        type: String,  
        required: false,
    },

    forgotPasswordCode : String ,

    // OTP cho email
    verificationCode : String ,

    isVerified : {type : Boolean , default: false},

    role : {
        type: Number ,
        default: 2, 
        // 1 for admin, 2 for user
    }


}
    , { timestamps: true }
);

// Đảm bảo rằng trường `id` là duy nhất và được sử dụng thay cho `_id`
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

// Thêm các địa chỉ của người dùng
userSchema.virtual('addresses', {
    ref: 'Address',
    localField: '_id',
    foreignField: 'userId',
});


const User = mongoose.model('User', userSchema);

module.exports = User;
