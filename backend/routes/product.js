const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/addProduct", productController.addProducts);
router.get("/bestSelling", productController.bestSellingProducts);
router.get("/search", productController.fetchSearchResult);

module.exports = router;
