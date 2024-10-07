const mongoose = require("mongoose");

const giftCardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientMobileNumber: {
    type: String,
    required: true,
  },
  recipientEmailAddress: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderMobileNumber: {
    type: String,
    required: true,
  },
  senderEmailAddress: {
    type: String,
    required: true,
  },
  senderMessage: {
    type: String,
  },
});

const GiftCard =
  mongoose.models.GiftCard || mongoose.model("GiftCard", giftCardSchema);
module.exports = GiftCard;
