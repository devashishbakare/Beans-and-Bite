const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    ],
    takeAwayFrom: {
      type: String,
      minlength: 3,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Wallet", "Payment Gateway"],
      required: true,
    },
    additionalMessage: {
      type: String,
    },
  },
  { timestamps: true }
);
orderSchema.plugin(AutoIncrement, {
  inc_field: "orderId",
});
module.exports = mongoose.model("Order", orderSchema);
