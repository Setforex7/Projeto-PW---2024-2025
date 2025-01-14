const express = require('express');

//? Definição do router
const router = express.Router();

const auction = require('../controllers/auction');

router.get('/', auction.initialPage);
router.get('/profile', auction.profilePage);

exports.router = router;