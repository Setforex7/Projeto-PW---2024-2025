const express = require('express');

const router = express.Router();

const upload = require('../database/multer');
const authController = require('../controllers/authController');

router.get("/", authController.initialPage);
router.get("/logout", authController.logout);
router.get("/profile", authController.profilePage);

router.post("/signin", authController.signin);
router.post("/login", authController.login);
router.post("/create-auction", upload.single('file'), authController.createAuction);
router.post("/bid", authController.makeBid);
router.post("/delete-auction", authController.deleteAuction);

exports.router = router;