const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenticate = require("../config/authMiddleware");

router.post("/signIn", userController.signIn);
router.post("/signUp", userController.signUp);
router.get("/details", authenticate, userController.fetchUserDetails);
router.patch("/editProfile", authenticate, userController.updateProfileInfo);
module.exports = router;
