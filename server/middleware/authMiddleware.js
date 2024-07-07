const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { getUserById } = require('../controllers/user.controller');

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.authtoken;

    if (!token) {
        return res.status(401).json({ message: "Not authorized to access this route" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await getUserById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized to access this route", error: error.message });
    }
})

module.exports = protect;