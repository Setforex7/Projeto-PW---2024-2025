const express = require('express');

const auction = require('../controllers/auction');

//? Definição do router
const router = express.Router();

router.get('/admin', auction.adminDashboard);

exports.router = router;