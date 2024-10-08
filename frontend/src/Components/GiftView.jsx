import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History } from "./History";
import { useState } from "react";
import { GiftCardSchema } from "../ValidationSchema/GiftCard";
import { useFormik } from "formik";
import { giftCardAmount } from "../utils/DisplayData";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/notification";
import { ToastContainer } from "react-toastify";
import { updateSignInUpModal } from "../redux/slices/userAuthSlice";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { IoWallet } from "react-icons/io5";
import {
  payViaWallet,
  payViaPaymentGateway,
  razorpayCreateGiftRequest,
  razorpayVarifyGiftOrder,
} from "../utils/api";
import {
  setWalletAmount,
  updateWallet,
} from "../redux/slices/notificationSlice";
export const GiftView = () => {
  const dispatch = useDispatch();
  const { extraData } = useSelector((state) => state.navbarSelection);
  const { wallet } = useSelector((state) => state.notification);
  const { isAuthenticated, token } = useSelector((state) => state.userAuth);
  const cardInfo = extraData;
  const [slideAbove, setSlideAbove] = useState(new Array(3).fill(false));
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [payOptionModal, setShowPayOptionModal] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      if (isAuthenticated == false) {
        dispatch(updateSignInUpModal({ requestFor: "open" }));
      }
    };
    checkLogin();
  }, []);

  const giftCardInitialValue = {
    amount: 0,
    recipientName: "",
    recipientEmailId: "",
    recipientMobileNumber: "",
    senderName: "",
    senderMobileNumber: "",
    message: "",
  };

  const giftCardFormik = useFormik({
    initialValues: {
      ...giftCardInitialValue,
      formType: "gifrCardDetailsSubmission",
    },
    validationSchema: GiftCardSchema,
    onSubmit: async (values, action) => {
      setShowPayOptionModal(true);
    },
  });

  const handleSlideAbove = (event, index) => {
    if (event.target.id == "topSlideHeading") {
      if (slideAbove[0] == true && slideAbove[1] == true) {
        let newSlide = new Array(3).fill(false);
        newSlide[0] = true;
        setSlideAbove(newSlide);
      } else {
        let newSlide = [...slideAbove];
        if (index == 0) {
          newSlide[0] = !newSlide[0];
        }
        setSlideAbove(newSlide);
      }
    }
    if (event.target.id == "middleSlideHeading") {
      if (slideAbove[1] == true) {
        let newSlide = new Array(3).fill(false);
        newSlide[0] = true;
        setSlideAbove(newSlide);
      } else {
        let newSlide = new Array(3).fill(false);
        newSlide[0] = true;
        newSlide[1] = true;
        setSlideAbove(newSlide);
      }
    }

    if (event.target.id == "bottomSlideHeading") {
      if (slideAbove[2] == true) {
        let newSlide = new Array(3).fill(true);
        newSlide[2] = false;
        setSlideAbove(newSlide);
      } else {
        let newSlide = new Array(3).fill(true);
        setSlideAbove(newSlide);
      }
    }
  };

  const handleMakePayment = () => {};

  const handleOutSideBoxCloseModal = (event) => {
    if (event.target.id == "payOptionModal") {
      setShowPayOptionModal(false);
    }
  };

  const handlePayOptions = async (userPaymentOptionSelection) => {
    const giftCollectedInfo = {
      giftCardName: cardInfo.title,
      amount: giftCardFormik.values.amount,
      recipientName: giftCardFormik.values.recipientName,
      recipientEmailId: giftCardFormik.values.recipientEmailId,
      recipientMobileNumber: giftCardFormik.values.recipientMobileNumber,
      senderName: giftCardFormik.values.senderName,
      senderMobileNumber: giftCardFormik.values.senderMobileNumber,
      message: giftCardFormik.values.message,
    };

    if (userPaymentOptionSelection == "wallet") {
      setShowPayOptionModal(false);
      setPaymentLoader(true);
      const response = await payViaWallet(token, giftCollectedInfo);
      if (response.success) {
        dispatch(setWalletAmount({ amount: response.data.walletAmount }));
        setSlideAbove(new Array(3).fill(false));
        showSuccessNotification(
          "Gift has been sent, your friend will be notify with email and what's app message"
        );
        giftCardFormik.resetForm();
      } else {
        showErrorNotification("something went wrong, please try again later");
      }
      setPaymentLoader(false);
    } else {
      setShowPayOptionModal(false);
      setPaymentLoader(true);
      const response = await razorpayCreateGiftRequest(
        token,
        giftCardFormik.values.amount
      );
      console.log(response, "response from create gift request");
      if (response.success) {
        handleOpenRazerpay(response.data, giftCollectedInfo);
      } else {
        setPaymentLoader(false);
        showErrorNotification("something went wrong, please try again later");
      }
    }
    giftCardFormik.resetForm();
  };

  const handleOpenRazerpay = (giftOrderDetails, giftCollectedInfo) => {
    var options = {
      key: "rzp_test_uYsyA6UZFPgGxV",
      amount: Number(giftOrderDetails.amount),
      currency: giftOrderDetails.currency,
      name: "Beans and Bite",
      description: "Test Transaction",
      image:
        "http://res.cloudinary.com/djgouef8q/image/upload/v1728289204/c6mavwy6p93u2vzp8lic.png",
      order_id: giftOrderDetails.id,
      handler: async function (response) {
        setPaymentLoader(true);
        const data = {
          giftOrder_id: giftOrderDetails.id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          razorpay_payment_id: response.razorpay_payment_id,
        };
        const responseForVarification = await razorpayVarifyGiftOrder(data);
        console.log(responseForVarification, "verify response");
        if (responseForVarification.success === true) {
          const response = await payViaPaymentGateway(token, giftCollectedInfo);
          console.log(response, "pay via payment gateway response");

          if (response.success) {
            showSuccessNotification(
              "Gift has been sent, your friend will be notify with email and what's app message"
            );
            setSlideAbove(new Array(3).fill(false));
            giftCardFormik.resetForm();
          } else {
            showErrorNotification(
              "something went wrong, please try again later"
            );
          }
        } else {
          showErrorNotification("something went wrong, please try again later");
        }
        setPaymentLoader(false);
      },
      prefill: {},
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp = new window.Razorpay(options);
    console.log("requesting for open razorpay");
    setPaymentLoader(false);
    rzp.open();
  };

  return (
    <div className="h-full w-full flex flex-col relative ">
      {payOptionModal && (
        <div
          onClick={(e) => handleOutSideBoxCloseModal(e)}
          id="payOptionModal"
          className="absolute centerToPage z-[8890] h-full w-full bg-black bg-opacity-15 centerDiv addBorder "
        >
          <div className="addShadow h-auto w-[90%] min-w-[300px] max-w-[600px] centerDiv flex-col p-2 gap-[10px] rounded-md bg-slate-50 md:w-[500px] ">
            <span className="h-[auto] w-[90%] p-2 addFont text-center ">
              Choose your preferred payment method, Use your Wallet balance or
              proceed with a Payment Gateway
            </span>
            <div className="h-[50px] w-[90%] centerDiv gap-2">
              <button
                onClick={() => handlePayOptions("wallet")}
                className=" h-[40px] w-[120px] capitalize text-[0.89rem] theamColor text-white rounded-md p-2 md:h-[40px]"
              >
                Wallet
              </button>
              <button
                onClick={() => handlePayOptions("payment_gateway")}
                className=" h-[40px] w-[180px] capitalize text-[0.89rem] theamColor text-white rounded-md p-2 md:h-[40px]"
              >
                payment gateway
              </button>
            </div>
            <div className="h-[50px] w-full flex items-center gap-2 centerDiv">
              <IoWallet className="text-[1.3rem]" />
              <span className="addFont text-[0.95rem]">Wallet Balance :</span>
              <span className="">{wallet == null ? 0 : wallet}</span>
            </div>
          </div>
        </div>
      )}
      <div className="h-[70px] w-full centerDiv theamColor shrink-0 z-[8886]">
        <History />
      </div>
      <div className="h-full w-full addBorder centerDiv">
        <form
          onSubmit={giftCardFormik.handleSubmit}
          autoComplete="off"
          className="h-full w-full max-w-[1050px] addBorder flex flex-col overflow-hidden relative"
        >
          {paymentLoader == true && (
            <div className="centerToPage h-[120px] w-[250px] z-[9999] bg-white flex flex-col items-center p-2 addShadow rounded-md">
              <span className="h-[50%] w-full text-center addFont">
                we are processing your request please wait
              </span>
              <span className="h-[50%] w-full centerDiv">
                <CircularSpinner />
              </span>
            </div>
          )}
          <div className="absolute left-[1%] top-[3%]">
            <div className="h-auto w-auto p-3 flex flex-col bg-gradient-to-b from-transparent to-black addFont rounded-md text-[1.6rem] text-white">
              {cardInfo.title}
            </div>
          </div>
          <img
            src={cardInfo.image}
            alt="productImage"
            className="h-[510px] w-full object-cover"
          />

          <div
            onClick={(event) => handleSlideAbove(event, 0)}
            className={`absolute z-[8888] bottom-[-330px] left-0 h-[650px] w-full cursor-pointer transition-transform duration-500  centerDiv rounded-t-[25px] ${
              slideAbove[0]
                ? "translate-y-[-350px] theamColor border-none"
                : "translate-y-0 bg-[#f1ebeb] border-[0.6px] border-gray-100"
            }`}
          >
            <div className="h-full w-full max-w-[1050px] flex flex-col">
              <div
                id="topSlideHeading"
                className={`text-[0.9rem] pl-3 h-[80px] w-full flex justify-between pr-[10%] items-center addFont capitalize sm:pl-1 sm:text-[1.03rem] ${
                  slideAbove[0] == false ? `baseColor` : `text-white`
                } md:pl-[20px]`}
              >
                Gift card amount{" "}
                {slideAbove[0] == false ? <FaAngleDown /> : <FaAngleUp />}
              </div>

              <div className="h-[340px] w-full overflow-y-scroll flex flex-col md:pl-[25px]">
                <div className="h-[70px] w-full flex items-center overflow-x-scroll gap-3 pl-[15px] no-scrollbar">
                  {giftCardAmount.map((amount) => (
                    <div
                      onClick={() =>
                        giftCardFormik.setFieldValue("amount", amount)
                      }
                      key={cardInfo.id + "gift" + amount}
                      className="h-[40px] w-auto p-2 border-[1px] border-slate-500 flex items-center rounded-3xl text-[#f4f4f4] gap-1"
                    >
                      <span className="pb-[5px]">+</span>
                      <span className="text-[1rem]">₹</span>
                      <span className="">{amount}</span>
                    </div>
                  ))}
                </div>
                <div className="h-[100px] w-full flex flex-col p-2 mt-[10px]">
                  <span className="uppercase ml-2 text-[#f4f4f4] text-[0.85rem] ">
                    enter custome amount
                  </span>
                  <div className="h-[50px] w-full flex items-start flex-col">
                    <input
                      type="number"
                      name="amount"
                      className="h-[40px] w-full theamColor outline-none pl-2 placeHolder text-[#f4f4f4]"
                      placeholder="Enter amount"
                      value={
                        giftCardFormik.values.amount > 0
                          ? giftCardFormik.values.amount
                          : ""
                      }
                      onChange={giftCardFormik.handleChange}
                      onBlur={giftCardFormik.handleBlur}
                      data-testid="giftCard-amount-input-testid"
                    />
                    <span className="w-[98%] max-w-[400px] border-[1px] border-gray-500 ml-2"></span>
                  </div>
                  {giftCardFormik.errors.amount &&
                  giftCardFormik.touched.amount ? (
                    <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                      {giftCardFormik.errors.amount}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div
            onClick={(event) => handleSlideAbove(event, 1)}
            className={`absolute z-[8889] bottom-[-410px] left-0 h-[650px] w-full cursor-pointer transition-transform duration-500  rounded-md centerDiv ${
              slideAbove[1]
                ? "translate-y-[-350px] theamColor"
                : "translate-y-0 bg-[#f1ebeb]"
            }`}
          >
            <div className="h-full w-full max-w-[1050px] flex flex-col">
              <div
                id="middleSlideHeading"
                className={`text-[0.9rem] pl-3 h-[80px] w-full flex justify-between pr-[10%] items-center addFont capitalize sm:pl-1 border-t-[1px] border-green-900 sm:text-[1.03rem] ${
                  slideAbove[1] == false ? `baseColor` : `text-white`
                } md:pl-[20px]`}
              >
                recipient details
                {slideAbove[1] == false ? <FaAngleDown /> : <FaAngleUp />}
              </div>

              <div className="h-[340px] w-full overflow-y-scroll flex flex-col md:pl-[25px]">
                <div className="h-[100px] w-full flex flex-col p-2">
                  <span className="uppercase ml-2 text-[#f4f4f4] text-[0.85rem] ">
                    enter recipient name
                  </span>
                  <div className="h-[50px] w-full flex items-start flex-col">
                    <input
                      type="text"
                      name="recipientName"
                      className="h-[40px] w-full theamColor outline-none pl-2 placeHolder text-[#f4f4f4]"
                      placeholder="Enter name"
                      value={giftCardFormik.values.recipientName}
                      onChange={giftCardFormik.handleChange}
                      onBlur={giftCardFormik.handleBlur}
                      data-testid="giftCard-amount-input-testid"
                    />
                    <span className="w-[98%] max-w-[400px] border-[1px] border-gray-500 ml-2"></span>
                  </div>
                  {giftCardFormik.errors.recipientName &&
                  giftCardFormik.touched.recipientName ? (
                    <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                      {giftCardFormik.errors.recipientName}
                    </span>
                  ) : null}
                </div>
                <div className="h-[100px] w-full flex flex-col p-2">
                  <span className="uppercase ml-2 text-[#f4f4f4] text-[0.85rem] ">
                    enter recipient email Id
                  </span>
                  <div className="h-[50px] w-full flex items-start flex-col">
                    <input
                      type="text"
                      name="recipientEmailId"
                      className="h-[40px] w-full theamColor outline-none pl-2 placeHolder text-[#f4f4f4]"
                      placeholder="Enter email Id"
                      value={giftCardFormik.values.recipientEmailId}
                      onChange={giftCardFormik.handleChange}
                      onBlur={giftCardFormik.handleBlur}
                      data-testid="giftCard-amount-input-testid"
                    />
                    <span className="w-[98%] max-w-[400px] border-[1px] border-gray-500 ml-2"></span>
                  </div>
                  {giftCardFormik.errors.recipientEmailId &&
                  giftCardFormik.touched.recipientEmailId ? (
                    <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                      {giftCardFormik.errors.recipientEmailId}
                    </span>
                  ) : null}
                </div>
                <div className="h-[100px] w-full flex flex-col p-2">
                  <span className="uppercase ml-2 text-[#f4f4f4] text-[0.85rem] ">
                    enter recipient mobile number
                  </span>
                  <div className="h-[50px] w-full flex items-start flex-col">
                    <input
                      type="text"
                      name="recipientMobileNumber"
                      className="h-[40px] w-full theamColor outline-none pl-2 placeHolder text-[#f4f4f4]"
                      placeholder="Enter mobile number"
                      value={giftCardFormik.values.recipientMobileNumber}
                      onChange={giftCardFormik.handleChange}
                      onBlur={giftCardFormik.handleBlur}
                      data-testid="giftCard-amount-input-testid"
                    />
                    <span className="w-[98%] max-w-[400px] border-[1px] border-gray-500 ml-2"></span>
                  </div>
                  {giftCardFormik.errors.recipientMobileNumber &&
                  giftCardFormik.touched.recipientMobileNumber ? (
                    <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                      {giftCardFormik.errors.recipientMobileNumber}
                    </span>
                  ) : null}
                </div>
                <div className="h-auto w-full pl-[15px] text-[#f5f5f5] opacity-75 text-[0.7rem] capitalize">
                  gift card details will be sent to the above email ID and
                  mobile number after purchase
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          <div
            onClick={(event) => handleSlideAbove(event, 2)}
            className={`absolute z-[8889] bottom-[-490px] left-0 h-[650px] w-full cursor-pointer transition-transform duration-500  rounded-md centerDiv ${
              slideAbove[2]
                ? "translate-y-[-350px] theamColor"
                : "translate-y-0 bg-[#f1ebeb]"
            }`}
          >
            <div className="h-full w-full max-w-[1050px] flex flex-col">
              <div
                id="bottomSlideHeading"
                className={`text-[0.9rem] pl-3 h-[80px] w-full flex justify-between pr-[10%] items-center addFont capitalize border-t-[1px] border-green-900  sm:pl-1 sm:text-[1.03rem] ${
                  slideAbove[2] == false ? `baseColor` : `text-white`
                } md:pl-[20px]`}
              >
                sender details{" "}
                {slideAbove[2] == false ? <FaAngleDown /> : <FaAngleUp />}
              </div>

              <div className="h-[340px] w-full overflow-y-scroll flex flex-col md:pl-[25px]">
                <div className="h-[100px] w-full flex flex-col p-2">
                  <span className="uppercase ml-2 text-[#f4f4f4] text-[0.85rem] ">
                    enter sender name
                  </span>
                  <div className="h-[50px] w-full flex items-start flex-col">
                    <input
                      type="text"
                      name="senderName"
                      className="h-[40px] w-full theamColor outline-none pl-2 placeHolder text-[#f4f4f4]"
                      placeholder="Enter Name"
                      value={giftCardFormik.values.senderName}
                      onChange={giftCardFormik.handleChange}
                      onBlur={giftCardFormik.handleBlur}
                      data-testid="giftCard-amount-input-testid"
                    />
                    <span className="w-[98%] max-w-[400px] border-[1px] border-gray-500 ml-2"></span>
                  </div>
                  {giftCardFormik.errors.senderName &&
                  giftCardFormik.touched.senderName ? (
                    <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                      {giftCardFormik.errors.senderName}
                    </span>
                  ) : null}
                </div>
                <div className="h-[100px] w-full flex flex-col p-2">
                  <span className="uppercase ml-2 text-[#f4f4f4] text-[0.85rem] ">
                    enter sender mobile number
                  </span>
                  <div className="h-[50px] w-full flex items-start flex-col">
                    <input
                      type="text"
                      name="senderMobileNumber"
                      className="h-[40px] w-full theamColor outline-none pl-2 placeHolder text-[#f4f4f4]"
                      placeholder="Enter Mobile Number"
                      value={giftCardFormik.values.senderMobileNumber}
                      onChange={giftCardFormik.handleChange}
                      onBlur={giftCardFormik.handleBlur}
                      data-testid="giftCard-amount-input-testid"
                    />
                    <span className="w-[98%] max-w-[400px] border-[1px] border-gray-500 ml-2"></span>
                  </div>
                  {giftCardFormik.errors.senderMobileNumber &&
                  giftCardFormik.touched.senderMobileNumber ? (
                    <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                      {giftCardFormik.errors.senderMobileNumber}
                    </span>
                  ) : null}
                </div>
                <div className="h-[150px] w-full flex flex-col p-2">
                  <span className="uppercase ml-2 text-[#f4f4f4] text-[0.85rem] ">
                    Enter your message (Optional)
                  </span>

                  <div className="h-[100px] w-full flex items-start flex-col mt-[10px]">
                    <textarea
                      name="message"
                      className="h-auto w-full theamColor outline-none pl-2 placeHolder text-[#f4f4f4] border-b-[1px] border-gray-500 max-w-[400px]"
                      placeholder="Enter your message"
                      value={giftCardFormik.values.message}
                      onChange={giftCardFormik.handleChange}
                      onBlur={giftCardFormik.handleBlur}
                      data-testid="giftCard-message-textarea-testid"
                    />
                    {/* <span className="w-[98%] max-w-[400px] border-[1px] border-gray-500 ml-2"></span> */}
                  </div>

                  {giftCardFormik.errors.message &&
                  giftCardFormik.touched.message ? (
                    <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                      {giftCardFormik.errors.message}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute z-[8890] bottom-[-2px] left-0 h-[80px] w-full bg-[#116241] centerDiv">
            <div className="h-full w-full max-w-[1050px] flex justify-between">
              <span className="h-full w-auto text-white centerDiv pl-3 md:pl-[30px]">
                {giftCardFormik.values.amount > 0 &&
                  `₹ ${giftCardFormik.values.amount}`}
              </span>

              <div className="h-full w-[130px] centerDiv pr-3">
                <button
                  type="submit"
                  className="h-[35px] w-[120px] bg-[#f4f4f4] baseColor rounded-[20px] text-[0.8rem] addFont"
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
