const User = require('../models/User');

const getUserById = async (id) => {
    try {
        const user = await User.findById(id).select('-password');
        return user;
    } catch (error) {
        return null;
    }
}

module.exports = getUserById;   