const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controller/resetPasswordController");
router.get("/forgotPassword/:email", resetPasswordController.forgotPassword);
router.patch("/reset", resetPasswordController.reset);
module.exports = router;
