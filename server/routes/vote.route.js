const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { CastVote } = require("../controllers/votes.controller");

router.route("/")
    .post(protect, CastVote)


module.exports = router;