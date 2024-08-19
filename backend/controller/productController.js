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

const bestSellingProducts = async (req, res) => {
  try {
    const condition = {
      category: {
        $in: ["Bestseller", "Drinks"],
      },
    };
    const response = await Product.find(condition);
    return res
      .status(200)
      .json({ data: response, message: "Best selling products" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};
const fetchSearchResult = async (req, res) => {
  try {
    const searchKey = req.query.key;
    if (!searchKey) {
      return res.status(400).json({ message: "search key not found" });
    }

    const searchWords = searchKey.split(" ");
    const regexPatterns = searchWords.map((word) => new RegExp(word, "i"));
    const searchFor = {
      $or: [
        { name: regexPatterns },
        { category: regexPatterns },
        { productType: regexPatterns },
      ],
    };

    const result = await Product.find(searchFor);
    const searchResult = result.map((product) => {
      return {
        id: product._id,
        image: product.productCartImage,
        productName: product.name,
      };
    });

    return res.status(200).json({
      data: searchResult,
      message: "Search Result",
      regex: searchWords,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};
module.exports = {
  t,
  addProducts,
  bestSellingProducts,
  fetchSearchResult,
};
