const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../model/User");
const createOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const { amount } = req.body;

    var instance = new Razorpay({
      key_id: process.env.REZ_KEY,
      key_secret: process.env.REZ_SECRET,
    });

    var options = {
      amount: amount * 100,
      currency: "INR",
      receipt: process.env.REZ_ORDER_RECIPT_ID,
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        return res
          .status(500)
          .json("something went wrong while creating order");
      }
      console.log(order, "order has been created");
      return res.status(200).json({ data: order });
    });
  } catch (error) {
    return res.status(500).json("Error in creating order");
  }
};

const verifyOrder = async (req, res) => {
  const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

  let body = order_id + "|" + razorpay_payment_id;

  let expectedSignature = crypto
    .createHmac("sha256", process.env.REZ_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.status(200).json({ message: "payment has been varified" });
  } else {
    return res
      .status(500)
      .json({ message: "payment has failed in verification" });
  }
};

module.exports = {
  createOrder,
  verifyOrder,
};
