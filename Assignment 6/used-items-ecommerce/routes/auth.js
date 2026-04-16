const express = require('express');
const { register, login, logout, renderLogin, renderRegister } = require('../controllers/authController');

const router = express.Router();

router.get('/register', renderRegister);
router.post('/register', register);

router.get('/login', renderLogin);
router.post('/login', login);

router.get('/logout', logout);

module.exports = router;
