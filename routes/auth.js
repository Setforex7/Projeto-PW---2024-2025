const express = require('express');

const router = express.Router();

const auth = require('../controllers/authController');

router.post('/signin', auth.signin); 
router.post('/login', auth.login);

exports.router = router;