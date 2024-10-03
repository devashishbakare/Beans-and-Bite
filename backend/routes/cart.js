const express = require("express");
const authenticate = require("../config/authMiddleware");
const cartController = require("../controller/cartController");
const router = express.Router();
router.post("/add", authenticate, cartController.addToCart);
router.get("/show", cartController.showAllCartElement);
router.get("/fetchCart", authenticate, cartController.fetchCartProduct);
router.patch("/removeItem", authenticate, cartController.removeItemFromCart);
router.patch(
  "/updateCartProduct",
  authenticate,
  cartController.updateCartProduct
);
module.exports = router;
