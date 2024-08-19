const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  productInfo: {
    type: String,
  },
  productDetails: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Bestseller",
      "Drinks",
      "Food",
      "Merchandise",
      "Coffee At Home",
      "Ready To Eat",
    ],
  },
  price: {
    type: Number,
    required: true,
  },
  productCartImage: {
    type: String,
    required: true,
  },
  productDetailsImage: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    enum: ["Veg", "Non-Veg", "Vegan"],
    default: null,
  },
});

module.exports = mongoose.model("Product", productSchema);
