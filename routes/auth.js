const express = require('express');

const router = express.Router();

const upload = require('../database/multer');
const authController = require('../controllers/authController');

router.get("/", authController.initialPage);
router.post("/signin", authController.signin);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/profile", authController.profilePage);
router.post("/create-auction", upload.single('file'), authController.createAuction);

exports.router = router;