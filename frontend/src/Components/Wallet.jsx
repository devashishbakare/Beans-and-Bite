import React from "react";
import { History } from "./History";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFromNavbar } from "../redux/slices/historySlice";
import { IoWallet } from "react-icons/io5";
import { updateSignInUpModal } from "../redux/slices/userAuthSlice";
import { updateWallet } from "../redux/slices/notificationSlice";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { IoCloseCircleSharp } from "react-icons/io5";
import {
  showSuccessNotification,
  showErrorNotification,
  showWarningNotification,
} from "../utils/notification";
import { ToastContainer } from "react-toastify";
import {
  razorpayCreateGiftRequest,
  razorpayVarifyGiftOrder,
  addToWallet,
} from "../utils/api";
export const Wallet = () => {
  const { wallet } = useSelector((state) => state.notification);
  console.log(wallet);
  const { isAuthenticated, token } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [paymentLoader, setPaymentLoader] = useState(false);
  const [amount, setAmount] = useState(0);
  const [validationError, setValidationError] = useState(0);
  const [showAmountSection, setShowAmountSection] = useState(false);
  useEffect(() => {
    const checkLogin = () => {
      if (isAuthenticated == false) {
        dispatch(updateSignInUpModal({ requestFor: "open" }));
      }
    };
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Wallet" }));
    };
    checkLogin();
    updateHistory();
  }, []);

  const handleAddMoneyInWallet = async () => {
    if (amount < 100 || amount > 10000) {
      showWarningNotification("Amount should be > 100 and < 10000");
      return;
    }
    setPaymentLoader(true);
    const response = await razorpayCreateGiftRequest(token, amount);
    console.log(response, "response from create gift request");
    if (response.success) {
      handleOpenRazerpay(response.data);
    } else {
      setPaymentLoader(false);
    }
  };

  const handleChange = (event) => {
    let userAmount = Number(event.target.value);
    setAmount(event.target.value);
    if (userAmount < 100 || userAmount > 10000) {
      setValidationError("Amount > 100 or < 10000");
    } else {
      setValidationError("");
    }
  };

  const handleCloseAddamount = () => {
    setAmount(0);
    setValidationError("");
    setShowAmountSection(false);
  };

  const handleOpenRazerpay = (giftOrderDetails) => {
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
          const response = await addToWallet(token, amount);
          console.log(response, "add to wallet response");

          if (response.success) {
            showSuccessNotification("Money has been added to your wallet");
            dispatch(updateWallet({ requestFor: "inc", value: amount }));
            handleCloseAddamount();
          } else {
            showErrorNotification(
              "something went wrong, please try again later"
            );
            handleCloseAddamount();
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
    <div className="h-full w-full flex flex-col centerDiv">
      <div className="h-[70px] w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px]">
          <History />
        </div>
      </div>
      <div className="flex-1 w-full max-w-[1050px] flex flex-col overflow-y-scroll items-center p-2 relative md:flex-row md:gap-[20px] md:items-start">
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
        <div className="h-auto w-full shrink-0 flex flex-col items-center p-2 gap-1 md:w-[350px] md:h-[450px] md:gap-[10px]">
          <span className="h-[50px] w-auto flex items-center addFont text-[1.1rem]">
            Balance in your wallet &nbsp; <IoWallet className="text-[1.8rem]" />
          </span>
          <div className="h-[170px] w-[95%] addShadow rounded-md theamColor centerDiv font-gilroy-bold text-[50px] tracking-tighter leading-[45.5px] text-[#f8f8f8] font-bold">
            ₹ {isAuthenticated == false ? 0 : wallet == null ? 0 : wallet}
          </div>
          <button
            onClick={() => setShowAmountSection(true)}
            className="h-[45px] w-auto pl-[10px] pr-[10px] theamColor text-[#f6f6f6] rounded-[20px] text-[0.8rem] addFont mt-[5px] md:mt-[15px] md:pl-[20px] md:pr-[20px]"
          >
            Add Money To Your Wallet
          </button>
          {showAmountSection && (
            <div className="h-[120px] w-full flex centerDiv mt-[10px] gap-[10px] relative addShadow md:w-[350px]">
              <span
                onClick={() => handleCloseAddamount()}
                className="absolute right-[1px] top-0"
              >
                <IoCloseCircleSharp className="text-[1.3rem]" />
              </span>
              <div className="h-full w-[200px] items-center flex flex-col">
                <span className="h-[30px] mt-[10px] w-full pl-[10px] text-[0.95rem] flex uppercase addFont">
                  Enter Amount
                </span>
                <div className="h-[40px] w-full flex items-center bg-[#f6f6f6] flex-col">
                  <input
                    type="number"
                    name="amount"
                    className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                    placeholder="Add Amount here.."
                    value={amount}
                    onChange={handleChange}
                    data-testid="walletAmount"
                  />
                  <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
                </div>
                {amount != 0 && validationError && (
                  <span className="h-[30px] w-[98%] text-[0.8rem] p-1 bg-[#f6dae7] text-red-600 font-thin">
                    {validationError}
                  </span>
                )}
              </div>
              <div className="h-full w-[110px] flex items-center">
                <button
                  onClick={() => handleAddMoneyInWallet()}
                  className="h-[45px] w-full theamColor text-[#f6f6f6] rounded-[20px] text-[0.8rem] addFont mt-[5px] md:mt-[15px] md:pl-[20px] md:pr-[20px]"
                >
                  Proceed
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 w-[95%] flex flex-col theamColor text-[#f6f6f6] p-2 relative addShadow rounded-md overflow-y-scroll no-scrollbar mt-[20px] pt-[30px] gap-[20px]  md:h-full md:pl-[30px]">
          <img
            src="http://res.cloudinary.com/djgouef8q/image/upload/v1724383231/kofsfd2k9puxunklexup.png"
            alt="flower"
            className="absolute right-[20px] top-0 h-[50px] w-[50px] bg-cover md:h-[80px] md:w-[80px]"
          />
          <div className="h-[80px] w-full flex items-center pl-[5px] addFont text-[1.4rem] capitalize">
            get started with wallet
          </div>
          <div className="h-auto flex flex-col p-2 gap-3">
            <span className=" addFont text-[1.2rem]">
              Adding Money to Wallet
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Click on Add Money to wallet
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Enter the amount you want to add (minimum ₹50, maximum ₹10,000).
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Choose your preferred payment method (credit/debit card, UPI,
              etc.).
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Complete the payment process. Your wallet will be credited
              instantly.
            </span>
          </div>
          <div className="h-auto flex flex-col p-2 gap-3">
            <span className="addFont text-[1.2rem]">Using Wallet Money</span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              You can use your wallet balance to pay for coffee, snacks, or send
              gifts.
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              At checkout, select <strong>Pay via Wallet</strong> if you have
              enough balance.
            </span>
          </div>
          <div className="h-auto flex flex-col p-2 gap-3">
            <span className="addFont text-[1.2rem]">Benefits of Wallet</span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Quick and easy payments without entering card details every time.
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Instant refunds for canceled orders go directly back to your
              wallet.
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Track all wallet transactions in the{" "}
              <strong>Transaction History</strong> section.
            </span>
          </div>
          <div className="h-auto flex flex-col p-2 gap-3">
            <span className="addFont text-[1.2rem]">Managing Your Wallet</span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Check your wallet balance anytime from your profile.
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              View your <strong>Transaction History</strong> to see all wallet
              activities, including adding or spending money.
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Set up automatic top-ups to ensure you always have sufficient
              balance (optional).
            </span>
          </div>
          <div className="h-auto flex flex-col p-2 gap-3">
            <span className="addFont text-[1.2rem]">
              Gifting Money via Wallet
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              Send money as a gift to another user from your wallet.
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              If the recipient is not registered, an account will be created for
              them automatically.
            </span>
            <span className="pl-[10px] opacity-70 text-[0.95rem]">
              The recipient will be notified about the gift and will be able to
              access their wallet.
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
