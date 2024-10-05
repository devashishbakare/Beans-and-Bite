const User = require("../model/User");
const Product = require("../model/Product");
const Cart = require("../model/CartCustomization");
const mongoose = require("mongoose");
const addToCart = async (req, res) => {
  const userId = req.userId;
  try {
    const {
      productId,
      size,
      milk,
      espresso,
      temperature,
      whippedTopping,
      syrupAndSauces,
      price,
    } = req.body;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res
        .status(400)
        .json({ messesge: "userId or productId not found" });
    }

    const cartItem = new Cart({
      userId: user._id,
      productId: product._id,
      amount: price,
      size: size,
      milk,
      espresso,
      temperature,
      whippedTopping,
      syrupAndSauces,
    });

    await cartItem.save();

    const updateUser = {
      $push: {
        cart: cartItem._id,
      },
    };

    const updatedUser = await User.updateOne({ _id: user._id }, updateUser);

    return res.status(200).json({
      data: { cartItem, updatedUser },
      message: "Product added in cart with customization",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
};

const showAllCartElement = async (req, res) => {
  const result = await Cart.find({});
  return res.status(200).json({ data: result });
};

const fetchCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "user not found" });
    }
    // const user = await User.findById(userId).populate("cart").exec();
    const user = await User.findById(userId).populate({
      path: "cart",
      populate: {
        path: "productId",
        model: "Product",
      },
    });

    return res
      .status(200)
      .json({ data: user.cart, message: "user cart products" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
};

const removeItemFromCart = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userId = req.userId;
    const { cartItemId } = req.body;

    const user = await User.findById(userId);
    if (!user || !user.cart.includes(cartItemId)) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid user or cart item" });
    }

    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cart item not found" });
    }

    const updateField = {
      $pull: {
        cart: cartItem._id,
      },
    };

    const userUpdateResponse = await User.updateOne(
      { _id: user._id },
      updateField,
      { session }
    );
    const cartUpdateResponse = await Cart.deleteOne(
      { _id: cartItem._id },
      { session }
    );

    await session.commitTransaction();

    return res.status(200).json({
      data: { userUpdateResponse, cartUpdateResponse },
      message: "update has been successfull",
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

const updateCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      cartId,
      size,
      milk,
      espresso,
      temperature,
      whippedTopping,
      syrupAndSauces,
      price,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const cartProduct = await Cart.findById(cartId);
    if (!cartProduct) {
      return res.status(400).json({ error: "Cart Item not found" });
    }

    const cartItemUpdate = {
      $set: {
        amount: price,
        size: size,
        milk,
        espresso,
        temperature,
        whippedTopping,
        syrupAndSauces,
      },
    };

    const cartItemUpdateResponse = await Cart.updateOne(
      { _id: cartProduct._id },
      cartItemUpdate
    );
    return res.status(200).json({
      data: cartItemUpdateResponse,
      message: "cart Item has been updated",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const fetchFavouriteProduct = async (req, res) => {
  try {
    const userId = req.userId;

    if (!req.query.favourites) {
      return res.status(200).json({ data: [], message: "cart is emtpy" });
    }
    let { favourites } = req.query;

    favourites = Array.isArray(favourites)
      ? favourites
      : JSON.parse(favourites);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const productDetails = await Promise.all(
      favourites.map(async (productId) => await Product.findById(productId))
    );
    return res
      .status(200)
      .json({ data: productDetails, message: "Favourite products" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
};

module.exports = {
  addToCart,
  showAllCartElement,
  fetchCartProduct,
  removeItemFromCart,
  updateCartProduct,
  fetchFavouriteProduct,
};
