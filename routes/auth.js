const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { loginUser, getLoggedInUser } = require('../controllers/authController');

// @route    POST api/auth
// @desc     Autenticar usuario y obtener token (Login)
// @access   Public
router.post('/', loginUser);

// @route    GET api/auth
// @desc     Obtener datos del usuario logueado
// @access   Private (por eso usamos el middleware 'auth')
router.get('/', auth, getLoggedInUser);

module.exports = router;