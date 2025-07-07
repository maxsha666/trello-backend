const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createList } = require('../controllers/listsController');

router.route('/').post(auth, createList);

module.exports = router;