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
    const page = parseInt(req.query.page);
    const limit = 5;
    const skip = (page - 1) * limit;
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

    const resultCount = await Product.countDocuments(searchFor);
    //console.log(skip, limit, page, resultCount);
    const result = await Product.find(searchFor).skip(skip).limit(limit);

    return res.status(200).json({
      data: result,
      totalPages: Math.ceil(resultCount / limit),
      currentPage: page,
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

const fetchProductByCatagory = async (req, res) => {
  try {
    const categoryName = req.query.categoryName;
    if (!categoryName) {
      return res.status(400).json({ message: "Category Not Found" });
    }
    const categoryProducts = await Product.find({ category: categoryName });
    return res
      .status(200)
      .json({ data: categoryProducts, message: "Data By Category" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const fetchProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res.status(400).json({ message: "Product Not Found" });
    }
    const product = await Product.findById(productId);
    return res.status(200).json({ data: product, messege: "Product Details" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const fetchSearchSuggestion = async (req, res) => {
  try {
    const searchKey = req.query.key;
    if (!searchKey) {
      return res.status(400).json({ message: "Search key not found" });
    }

    const regexPattern = new RegExp(searchKey, "i");

    const searchFor = {
      $or: [
        { name: regexPattern },
        { category: regexPattern },
        { productType: regexPattern },
      ],
    };

    const result = await Product.find(searchFor);

    let suggestions = new Set();
    result.forEach((product) => {
      suggestions.add(product.name);
      suggestions.add(product.productType);
      suggestions.add(product.category);
    });

    return res
      .status(200)
      .json({ data: Array.from(suggestions), message: "Product suggestions" });
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
  fetchProductByCatagory,
  fetchProductDetails,
  fetchSearchSuggestion,
};
