const express = require('express');

const auction = require('../controllers/auction');

//? Definição do router
const router = express.Router();

router.get('/', auction.initialPage);
router.get('/profile', auction.profilePage);

exports.router = router;