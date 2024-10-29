const mongoose = require("mongoose");

const resetPasswordSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  tokenExpire: {
    type: Date,
    required: true,
  },
});

const ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema);
module.exports = ResetPassword;
