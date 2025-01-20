const express = require('express');

const auction = require('../controllers/mainController');

//? Definição do router
const router = express.Router();

router.get('/profile', auction.adminDashboard);

exports.router = router;