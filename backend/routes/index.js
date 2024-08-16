const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");
router.get("/", homeController.baseController);
router.use("/order", require("./order"));
router.use("/gift", require("./gift"));
router.use("/user", require("./user"));
router.use("/product", require("./product"));
module.exports = router;
