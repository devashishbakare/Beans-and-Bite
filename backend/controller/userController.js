const mongoose = require("mongoose");
const User = require("../model/User");
const Product = require("../model/Product");
const GiftCard = require("../model/GiftCard");
const Order = require("../model/Order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const t = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const condition = {
      $or: [{ email: userName }, { mobileNumber: userName }],
    };

    const user = await User.findOne(condition);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isPasswordPresent = bcrypt.compareSync(password, user.password);
    if (!isPasswordPresent) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    const cartCount = user.cart.length;
    const favouriteCount = user.favourites.length;
    const favourites = user.favourites;
    const wallet = user.wallet;

    return res.status(200).json({
      data: { token, cartCount, favouriteCount, favourites, wallet },
      message: "Sign in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const signUp = async (req, res) => {
  try {
    const { email, name, mobileNumber, password } = req.body;
    const conditions = {
      $or: [{ email }, { mobileNumber }],
    };

    const userPresent = await User.findOne(conditions);
    if (userPresent) {
      return res
        .status(400)
        .json({ message: "email or mobile number already exist" });
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const userObject = {
      email,
      name,
      mobileNumber,
      password: hash,
    };
    const user = await User.create(userObject);

    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "User has been resigister successfully",
      data: token,
      userDetails: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const fetchUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const userDetails = await User.findById(userId);
    return res.status(200).json({ data: userDetails, messege: "User Details" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const updateProfileInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, mobileNumber, password } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const updateFields = {
      $set: {
        name,
        email,
        mobileNumber,
        password: hash,
      },
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    const payload = {
      userId: updatedUser._id,
      email: updatedUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      data: { token, userDetails: updatedUser },
      message: "user profile has been updated",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "something wrong while updating user",
    });
  }
};

const addToFavorite = async (req, res) => {
  try {
    const userId = req.userId;

    const { productId } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res.status(400).json({ message: "input missing" });
    }
    const updateProduct = {
      $push: {
        favourites: product._id,
      },
    };

    const updateResponse = await User.updateOne(
      { _id: user._id },
      updateProduct
    );
    return res
      .status(200)
      .json({ data: updateResponse, message: "added to favorites" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const removeFromFavorite = async (req, res) => {
  try {
    const userId = req.userId;

    const { productId } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res.status(400).json({ message: "input missing" });
    }
    const updateProduct = {
      $pull: {
        favourites: product._id,
      },
    };

    const updateResponse = await User.updateOne(
      { _id: user._id },
      updateProduct
    );
    return res
      .status(200)
      .json({ data: updateResponse, message: "removed from favorites" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const fetchGiftHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { limit, page } = req.query;
    let skip = (page - 1) * limit;
    let user = await User.findById(userId);
    let totalGifts = user.gifts.length;
    user = await User.findById(userId)
      .select({
        gifts: {
          $slice: [skip, parseInt(limit)],
        },
      })
      .exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let giftDetails = await Promise.all(
      user.gifts.map(async (giftData) => {
        const gift = await GiftCard.findById(giftData.giftId);
        return { status: giftData.status, giftCardDetails: gift };
      })
    );

    return res.status(200).json({
      data: { giftDetails, totalGifts },
      message: "Gift Data for pagination",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const fetchOrderHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { page, limit } = req.query;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let totalOrderCount = user.orders.length;
    let skip = (page - 1) * limit;
    user = await User.findById(userId).select({
      orders: {
        $slice: [skip, parseInt(limit)],
      },
    });

    const pageOrderHistory = await Promise.all(
      user.orders.map(
        async (orderId) =>
          await Order.findById(orderId)
            .populate({
              path: "products",
              populate: {
                path: "productId",
                model: "Product",
              },
            })
            .exec()
      )
    );
    return res.status(200).json({
      data: { orders: pageOrderHistory, totalOrder: totalOrderCount },
      message: "Order History of current page",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const { userName, email, mobileNumber, password } = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const updateFields = {
      $set: {
        name: userName,
        email,
        mobileNumber,
        password: hash,
      },
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    return res
      .status(200)
      .json({ data: updatedUser, message: "User Has Been Updated" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Token Missing" });
    }
    const cartCount = user.cart.length;
    const favouriteCount = user.favourites.length;
    const favourites = user.favourites;
    const wallet = user.wallet;
    return res.status(200).json({
      data: { cartCount, favouriteCount, favourites, wallet },
      message: "User data",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

module.exports = {
  t,
  signIn,
  signUp,
  fetchUserDetails,
  updateProfileInfo,
  addToFavorite,
  removeFromFavorite,
  fetchGiftHistory,
  fetchOrderHistory,
  editProfile,
  getUserData,
};
