const PORT = process.env.PORT || 8000;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors())

connectDB();

app.get("/", function (req, res) {
    res.send("Hello World");
})

app.get("/hello", function (req, res) {
    res.send("Say Hello to the World!");
})

app.post("/", function (req, res) {
    const data = req.body;
    console.log(data);
    res.send("Data received");
})

app.post("/auth/signup", async function (req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    try {
        const newUser = new User({ name, email, password });
        const response = await newUser.save();

        res.status(201).json({ message: "User created successfully", data: response });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.get("/users", async function (req, res) {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.get("/user/:email", async function (req, res) {
    try {
        const users = await User.findOne({ email: req.params.email });
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}🚀`);
})