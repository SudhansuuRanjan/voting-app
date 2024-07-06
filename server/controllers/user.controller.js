const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const { hashPassword, matchPassword } = require('../utils/bcrypt');
const generateToken = require('../utils/generateToken');


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, age, avatar, role, address } = req.body;

    if (!name || !email || !password || !age) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {

        const userExists = await User.findOne({ email: email.toLowerCase() });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email: email.toLowerCase(), password: hashedPassword, age });
        let response = (await newUser.save()).toObject();
        delete response.password;

        res.status(201).json({ message: "User created successfully", data: response });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await matchPassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(res, user._id);

        let response = user.toObject();
        delete response.password;

        res.status(200).json({ message: "User logged in successfully", data: response });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})


const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json({ message: "User profile fetched successfully", data: user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})


const getUserById = async (id) => {
    try {
        const user = await User.findById(id).select('-password');
        return user;
    } catch (error) {
        return null;
    }
}


module.exports = { registerUser, handleLogin, getUserProfile, getUserById };