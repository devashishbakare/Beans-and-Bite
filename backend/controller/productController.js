const mongoose = require("mongoose");
const Product = require("../model/Product");

const t = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const addProducts = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { adminPassword, products } = req.body;
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({
        message:
          "Admin Password are not correct, you are accesing protected route",
      });
    }

    const response = await Promise.all(
      products.map(async (product) => await Product.create(product))
    );

    await session.commitTransaction();
    session.endSession();
    return res
      .status(200)
      .json({ data: response, message: "product added successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

module.exports = {
  t,
  addProducts,
};
