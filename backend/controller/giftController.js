const GiftCard = require("../model/GiftCard");
const User = require("../model/User");

const createGift = async (req, res) => {
  //todo : look into a sticky note and follow the plan
  // try {
  //   const {
  //   giftCardName,
  //   amount,
  //   recipientName,
  //   recipientEmailId,
  //   recipientMobileNumber,
  //   senderName,
  //   senderMobileNumber,
  //   message} = req.body;
  //   const userId = req.userId;
  //   const user = await User.findById(userId);
  //   if(!user){
  //     return res.status(400).json({message : "user not found"});
  //   }
  //   const gift = await GiftCard.create({
  //     name: giftCardName,
  //     amount,
  //     recipientName,
  //     recipientMobileNumber,
  //     recipientEmailAddress: recipientEmailId,
  //     senderName,
  //     senderMobileNumber,
  //     senderEmailAddress: user.email,
  //     senderMessage : message
  //   });
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

module.exports = {
  createGift,
  addToWallet,
};
