const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenticate = require("../config/authMiddleware");

router.post("/signIn", userController.signIn);
router.post("/signUp", userController.signUp);
router.get("/details", authenticate, userController.fetchUserDetails);
router.patch("/editProfile", authenticate, userController.updateProfileInfo);
router.post("/addFavorite", authenticate, userController.addToFavorite);
router.post("/removeFavorite", authenticate, userController.removeFromFavorite);
router.get("/giftHistory", authenticate, userController.fetchGiftHistory);
router.get("/orderHistory", authenticate, userController.fetchOrderHistory);
module.exports = router;
