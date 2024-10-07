const express = require("express");
const authenticate = require("../config/authMiddleware");
const giftController = require("../controller/giftController");
const router = express.Router();
router.post("/addToWallet", authenticate, giftController.addToWallet);
module.exports = router;
