const express = require('express');

const auction = require('../controllers/auction');

//? Definição do router
const router = express.Router();

router.get('/profile', auction.adminDashboard);

exports.router = router;