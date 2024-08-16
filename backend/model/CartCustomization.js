const mongoose = require("mongoose");

const cartCustomizationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: ["Short", "Tall", "Grande", "Venti"],
  },
  milk: {
    type: String,
    enum: [
      "With Milk",
      "Regular Milk",
      "Skimmed Milk",
      "Soy",
      "Almond",
      "Oats",
    ],
  },
  hot: {
    type: String,
    enum: ["Kids Hot", "Extra Hot"],
  },
  whippedTopping: {
    type: String,
    enum: ["With Whipped Topping", "Not With Whipped Topping"],
  },
  syrupsAndSauces: {
    type: String,
    enum: [
      "Mocha Sauce",
      "White Mocha Sauce",
      "Vanilla Syrup",
      "Hazelnut Syrup",
      "Caramel Syrup",
      "Caramel Sauce",
    ],
  },
});
module.exports = mongoose.model("CartCustomization", cartCustomizationSchema);
