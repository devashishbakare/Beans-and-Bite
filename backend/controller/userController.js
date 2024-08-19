const mongoose = require("mongoose");
const User = require("../model/User");
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
    const { email, mobileNumber, password } = req.body;

    const condition = {
      $or: [{ email }, { mobileNumber }],
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

    return res
      .status(200)
      .json({ data: token, message: "Sign in successfully" });
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
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong, try again later",
    });
  }
};

const updateProfileInfo = async (req, res) => {
  try {
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
};
