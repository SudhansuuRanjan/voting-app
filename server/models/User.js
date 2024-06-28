const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name'],
        minlength: [2, 'Name cannot be less than 2 characters']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    age: {
        type: Number,
        required: [true, 'Please provide an age'],
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    address: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;