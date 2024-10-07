const express = require("express");
const router = express.Router();
const authenticate = require("../config/authMiddleware");
const paymentController = require("../controller/paymentController");
router.post("/createBooking", authenticate, paymentController.createOrder);
router.post("/verify", paymentController.verifyOrder);
module.exports = router;
