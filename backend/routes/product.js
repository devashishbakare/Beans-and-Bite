const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/addProduct", productController.addProducts);

module.exports = router;
