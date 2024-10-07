const express = require("express");
const router = express.Router();
const authenticate = require("../config/authMiddleware");
const paymentController = require("../controller/paymentController");
router.post("/createGift", authenticate, paymentController.createGiftOrder);
router.post("/verifyGift", paymentController.verifyGiftOrder);
module.exports = router;
