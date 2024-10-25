const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  gifts: {
    type: [
      {
        status: {
          type: String,
          enum: ["received", "sent"],
          required: true,
        },
        giftId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "GiftCard",
          required: true,
        },
      },
    ],
    default: [],
  },

  wallet: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
