const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence");
const orderSchema = mongoose.Schema({
  orderId: {
    type: Number,
    default: 0,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    minlength: 5,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Online Payment", "Pay At Store"],
    required: true,
  },
});
orderSchema.plugin(AutoIncrement, {
  inc_field: "orderId",
});
module.exports = mongoose.model("Order", orderSchema);
