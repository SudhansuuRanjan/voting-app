const express = require('express');
const router = express.Router();
const { registerUser, handleLogin, getUserProfile } = require('../controllers/user.controller');
const protect = require('../middleware/authMiddleware');

router.post("/signup", registerUser);
router.post("/login", handleLogin);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;