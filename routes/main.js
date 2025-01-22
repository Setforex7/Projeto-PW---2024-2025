const express = require('express');

const mainController = require('../controllers/mainController');

//? O router armazena os nossos middlewares e routes
const router = express.Router();

router.get("/", mainController.initialPage);
router.get('/auction', mainController.auctionPage);
router.get("/bid-auction", mainController.bidPage);

exports.router = router;