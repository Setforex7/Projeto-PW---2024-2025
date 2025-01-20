const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.get("/", authController.initialPage);
router.post("/signin", authController.signin);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/profile", authController.profilePage);
router.post("/create-auction", authController.createAuction);

exports.router = router;