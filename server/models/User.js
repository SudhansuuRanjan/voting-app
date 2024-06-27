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
    }
},{
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;