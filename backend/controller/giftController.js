const { default: mongoose } = require("mongoose");
const GiftCard = require("../model/GiftCard");
const User = require("../model/User");
const bcrypt = require("bcrypt");

const createGift = async (req, res) => {
  //todo : look into a sticky note and follow the plan
  // try {
  // const {
  // giftCardName,
  // amount,
  // recipientName,
  // recipientEmailId,
  // recipientMobileNumber,
  // senderName,
  // senderMobileNumber,
  // message} = req.body;
  // const userId = req.userId;
  //   const user = await User.findById(userId);
  //   if(!user){
  //     return res.status(400).json({message : "user not found"});
  //   }
  // const gift = await GiftCard.create({
  //   name: giftCardName,
  //   amount,
  //   recipientName,
  //   recipientMobileNumber,
  //   recipientEmailAddress: recipientEmailId,
  //   senderName,
  //   senderMobileNumber,
  //   senderEmailAddress: user.email,
  //   senderMessage : message
  // });
  //   const updateUserGift = {
  //     $push: {
  //       gifts : gift._id,
  //     },
  //     wallet : user.wallet + amount
  //   }
  //   const updatedUserResponse = await User.updateOne({_id : user._id}, updateUserGift);
  //   return res.status(200).json({data : {gift, updatedUserResponse}, message : "gift has been created and deploy"});
  // } catch (error) {
  //   return res.status(500).json({
  //     error: error.message,
  //     message: "Something went wrong, try again later",
  //   });
  // }
};

const addToWallet = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const updatedFeild = {
      $inc: {
        wallet: amount,
      },
    };

    const updatedUser = await User.updateOne({ _id: user._id }, updatedFeild);
    return res
      .status(200)
      .json({ data: updatedUser, message: "Money has been added into wallet" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "something went wrong, please try again later",
    });
  }
};

const handlePayViaWallet = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const {
      giftCardName,
      amount,
      recipientName,
      recipientEmailId,
      recipientMobileNumber,
      senderName,
      senderMobileNumber,
      message,
    } = req.body;

    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User not found" });
    }

    const walletAmount = user.wallet;
    if (walletAmount < amount) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "In-sufficient balance in wallet" });
    }

    const checkUserByParameter = {
      $or: [
        { email: recipientEmailId },
        { mobileNumber: recipientMobileNumber },
      ],
    };
    let recipientUser = await User.findOne(checkUserByParameter).session(
      session
    );

    if (!recipientUser) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = await bcrypt.hash(process.env.NEW_USER_PASSWORD, salt);
      let newUser = await User.create(
        [
          {
            name: recipientName,
            email: recipientEmailId,
            mobileNumber: recipientMobileNumber,
            password: hash,
          },
        ],
        { session }
      );
      recipientUser = newUser[0];
    }
    const giftCard = await GiftCard.create(
      [
        {
          name: giftCardName,
          amount,
          recipientName,
          recipientMobileNumber,
          recipientEmailAddress: recipientEmailId,
          senderName,
          senderMobileNumber,
          senderEmailAddress: user.email,
          senderMessage: message,
        },
      ],
      { session }
    );

    const giftCardId = giftCard[0]._id;

    //decrement amount from sender wallet and update gifts as status sent
    const updateSenderWallet = {
      $inc: {
        wallet: -amount,
      },
      $push: {
        gifts: {
          status: "sent",
          giftId: giftCardId,
        },
      },
    };

    //decrement amount from recipient wallet and update gifts as status received
    const updateRecipentWallet = {
      $inc: {
        wallet: amount,
      },
      $push: {
        gifts: {
          status: "received",
          giftId: giftCardId,
        },
      },
    };

    const updatedSenderUser = await User.findByIdAndUpdate(
      user._id,
      updateSenderWallet,
      { new: true, session }
    );
    const updatedRecipientUser = await User.findByIdAndUpdate(
      recipientUser._id,
      updateRecipentWallet,
      { new: true, session }
    );
    const userWalletAmount = updatedSenderUser.wallet;
    //todo : you have to send email notification and whats app message for the same
    await session.commitTransaction();
    return res.status(200).json({
      data: { walletAmount: userWalletAmount },
      message: "gift has been sent",
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      error: error.message,
      message: "something went wrong, please try again later",
    });
  } finally {
    session.endSession();
  }
};

const handlePayViaGateway = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;
    const {
      giftCardName,
      amount,
      recipientName,
      recipientEmailId,
      recipientMobileNumber,
      senderName,
      senderMobileNumber,
      message,
    } = req.body;

    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User not found" });
    }

    const checkUserByParameter = {
      $or: [
        { email: recipientEmailId },
        { mobileNumber: recipientMobileNumber },
      ],
    };
    let recipientUser = await User.findOne(checkUserByParameter).session(
      session
    );

    if (!recipientUser) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = await bcrypt.hash(process.env.NEW_USER_PASSWORD, salt);
      let newUser = await User.create(
        [
          {
            name: recipientName,
            email: recipientEmailId,
            mobileNumber: recipientMobileNumber,
            password: hash,
          },
        ],
        { session }
      );
      recipientUser = newUser[0];
    }
    const giftCard = await GiftCard.create(
      [
        {
          name: giftCardName,
          amount,
          recipientName,
          recipientMobileNumber,
          recipientEmailAddress: recipientEmailId,
          senderName,
          senderMobileNumber,
          senderEmailAddress: user.email,
          senderMessage: message,
        },
      ],
      { session }
    );

    const giftCardId = giftCard[0]._id;

    //decrement amount from sender wallet and update gifts as status sent
    const updateSenderWallet = {
      $push: {
        gifts: {
          status: "sent",
          giftId: giftCardId,
        },
      },
    };

    //decrement amount from recipient wallet and update gifts as status received
    const updateRecipentWallet = {
      $inc: {
        wallet: amount,
      },
      $push: {
        gifts: {
          status: "received",
          giftId: giftCardId,
        },
      },
    };

    const updatedSenderUser = await User.findByIdAndUpdate(
      user._id,
      updateSenderWallet,
      { new: true, session }
    );
    const updatedRecipientUser = await User.findByIdAndUpdate(
      recipientUser._id,
      updateRecipentWallet,
      { new: true, session }
    );

    const userWalletAmount = updatedSenderUser.wallet;
    //todo : you have to send email notification and whats app message for the same
    await session.commitTransaction();
    return res.status(200).json({
      data: { walletAmount: userWalletAmount },
      message: "gift has been sent via payment gateway",
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      error: error.message,
      message: "something went wrong, please try again later",
    });
  } finally {
    session.endSession();
  }
};

module.exports = {
  createGift,
  addToWallet,
  handlePayViaWallet,
  handlePayViaGateway,
};
