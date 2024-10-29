const mongoose = require("mongoose");
const User = require("../model/User");
const Cart = require("../model/CartCustomization");
const Product = require("../model/Product");
const { beansAndBiteEmailQueue } = require("../config/queue");

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
    let storeProductInfo = [];
    const cartProducts = await Promise.all(
      products.map(async (cartId) => {
        const productCustomizationDetails = await Cart.findById(cartId).session(
          session
        );
        const productId = productCustomizationDetails.productId;
        const product = await Product.findById(productId);
        const productInfo = {
          image: product.productCartImage,
          name: product.name,
        };
        storeProductInfo.push(productInfo);
        return productCustomizationDetails;
      })
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

    const mailSendingInfo = {
      name: user.name,
      amount: order.amount,
      takeAwayFrom,
    };

    const pdfInfo = {
      user: {
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
      productInfo: storeProductInfo,
      paymentInfo: {
        paymentMethod,
        amount: totalAmount,
      },
    };
    console.log(pdfInfo);

    // await beansAndBiteEmailQueue.add("Order Confirmed", {
    //   from: "beansandbite@gmail.com",
    //   to: user.email,
    //   requestFor: "confirmOrder",
    //   subject: "Order Confirmation - Beans and Bite",
    //   data: mailSendingInfo,
    // });

    await session.commitTransaction();

    return res.status(200).json({
      data: {
        order,
        cartProducts,
        walletAmount: updatedUserResponse.wallet,
        pdfInfo,
      },
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

function getTimestampFromObjectId(objectId) {
  return new Date(parseInt(objectId.toString().substring(0, 8), 16) * 1000);
}

const updateOrderDates = async (req, res) => {
  try {
    const orders = await Order.find({});
    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const createdAt = getTimestampFromObjectId(order._id);
        return await Order.updateOne(
          { _id: order._id },
          { $set: { createdAt } }
        );
      })
    );

    return res.status(200).json({
      data: updatedOrders,
      message: "Order dates have been updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong while updating order dates",
    });
  }
};

const testEmailFunctionality = async (req, res) => {
  console.log("request comming here", req.body);
  try {
    const { to, mailSendingInfo } = req.body;
    await beansAndBiteEmailQueue.add("Order Confirmed", {
      from: "beansandbite@gmail.com",
      to,
      requestFor: "confirmOrder",
      subject: "Order Confirmation - Beans and Bite",
      data: mailSendingInfo,
    });
    return res.status(200).json({ message: "added to queue" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong while updating order dates",
    });
  }
};

const showOrderTemplate = (req, res) => {
  console.log("request comming here");
  const pdfInfo = {
    user: {
      name: "John Doe",
      email: "devbakare00@gmail.com",
      mobileNumber: "9876543211",
    },
    productInfo: [
      {
        image:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1724035655/mkpaehgvls2zv2fxh2lk.jpg",
        name: "Via-Italian Roast",
      },
      {
        image:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1724035989/i2ipwq4ebpf7fpwacmbz.jpg",
        name: "Almond Biscotti",
      },
    ],
    paymentInfo: {
      paymentMethod: "Payment Gateway",
      amount: 850.5,
    },
  };

  return res.render("orderSummary", { pdfInfo });
};

const showResetTemplate = (req, res) => {
  //console.log("request comming here");
  const resetPasswordInfo = {
    name: "John Doe",
    url: "abc",
  };

  return res.render("resetPassword", { resetPasswordInfo });
};
module.exports = {
  createOrder,
  updateOrderDates,
  testEmailFunctionality,
  showOrderTemplate,
  showResetTemplate,
};
