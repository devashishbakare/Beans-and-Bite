const express = require("express");
const authenticate = require("../config/authMiddleware");
const orderController = require("../controller/orderController");
const router = express.Router();
router.post("/create", authenticate, orderController.createOrder);
router.get("/updateDate", orderController.updateOrderDates);
router.post("/test", orderController.testEmailFunctionality);
module.exports = router;
