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
      "No Milk",
      "Whole Milk",
      "Skimmed Milk",
      "Soy Milk",
      "Almond Milk",
      "Lactose-Free Milk",
    ],
  },
  espresso: {
    type: String,
    enum: ["Indian Espresso Roast (Default)", "Extra Shot"],
  },
  temperature: {
    type: String,
    enum: ["Normal Hot", "Kids Hot", "Extra Hot"],
  },
  whippedTopping: {
    type: String,
    enum: ["No whipped Topping", "Whipped Topping"],
  },
  syrupAndSauces: {
    type: [
      {
        type: { type: String },
        quantity: { type: Number },
      },
    ],
    default: [],
  },
});
const Cart =
  mongoose.models.Cart || mongoose.model("Cart", cartCustomizationSchema);
module.exports = Cart;
