const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/addProduct", productController.addProducts);
router.get("/suggestion", productController.fetchSearchSuggestion);
router.get("/bestSelling", productController.bestSellingProducts);
router.get("/search", productController.fetchSearchResult);
router.get("/category/", productController.fetchProductByCatagory);
router.get("/details/:productId", productController.fetchProductDetails);
module.exports = router;
