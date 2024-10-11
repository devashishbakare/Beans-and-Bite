const mongoose = require("mongoose");
const User = require("../model/User");
const Cart = require("../model/CartCustomization");
const Order = require("../model/Order");
const t = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};
const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.userId;
    const user = await User.findById(userId).session(session);
    const { products, takeAwayFrom, amount, paymentMethod, additionalMessage } =
      req.body;
    if (!user) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User not found" });
    }

    const cartProducts = await Promise.all(
      products.map(
        async (cartId) => await Cart.findById(cartId).session(session)
      )
    );

    if (cartProducts.includes(null)) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cart Item not found" });
    }

    let totalAmount = cartProducts.reduce((acc, cartInfo) => {
      return acc + cartInfo.amount;
    }, 0);

    totalAmount += (totalAmount / 100) * 5;

    totalAmount = Number(totalAmount.toFixed(2));

    if (totalAmount !== amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Incorrect Amount" });
    }

    if (paymentMethod == "Wallet" && user.wallet < totalAmount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient amount in wallet" });
    }

    const orders = await Order.create(
      [
        {
          userId: user._id,
          products,
          takeAwayFrom,
          amount,
          paymentMethod,
          additionalMessage,
        },
      ],
      { session }
    );

    const order = orders[0];
    let updatedUserResponse;
    if (paymentMethod == "Wallet") {
      updatedUserResponse = await User.findByIdAndUpdate(
        userId,
        {
          $push: { orders: order._id },
          $set: { cart: [] },
          $inc: { wallet: -totalAmount },
        },
        { new: true, session }
      );
    } else {
      updatedUserResponse = await User.findByIdAndUpdate(
        userId,
        { $push: { orders: order._id }, $set: { cart: [] } },
        { new: true, session }
      );
    }
    await session.commitTransaction();

    return res.status(200).json({
      data: { order, cartProducts, walletAmount: updatedUserResponse.wallet },
      message: "order has been created",
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  } finally {
    session.endSession();
  }
};

module.exports = {
  createOrder,
};
