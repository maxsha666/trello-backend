const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/users');

// @route    POST /api/users
// @desc     Register a user
// @access   Public
router.post('/', registerUser);

module.exports = router;