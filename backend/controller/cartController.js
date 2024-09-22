const User = require("../model/User");
const Product = require("../model/Product");
const Cart = require("../model/CartCustomization");
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
      .json({ errro: error.message, message: "something went wrong" });
  }
};

const showAllCartElement = async (req, res) => {
  const result = await Cart.find({});
  return res.status(200).json({ data: result });
};

module.exports = {
  addToCart,
  showAllCartElement,
};
