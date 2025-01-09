const express = require('express');

//? Import do controler para aqui ( apenas vai devolver callback functions )
const auction = require("../controllers/auction");

//? O router armazena os nossos middlewares e routes
const router = express.Router();

router.get("/", auction.auctionPage);

exports.router = router;