import React from "react";
import { History } from "./History";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFromNavbar } from "../redux/slices/historySlice";
import { IoWallet } from "react-icons/io5";
export const Wallet = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Wallet" }));
    };
    updateHistory();
  }, []);

  return (
    <div className="h-full w-full flex flex-col centerDiv">
      <div className="h-[70px] w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px]">
          <History />
        </div>
      </div>
      <div className="flex-1 w-full max-w-[1050px] flex flex-col overflow-y-scroll items-center p-2 md:flex-row md:gap-[20px] md:items-start">
        <div className="h-[300px] w-full shrink-0 flex flex-col items-center p-2 gap-1 md:w-[350px] md:h-[350px] md:gap-[10px]">
          <span className="h-[50px] w-auto flex items-center addFont text-[1.1rem]">
            Balance in your wallet
          </span>
          <div className="h-[170px] w-[95%] addShadow rounded-md theamColor centerDiv font-gilroy-bold text-[50px] tracking-tighter leading-[45.5px] text-[#f8f8f8] font-bold">
            ₹ 789.66
          </div>
          <button className="h-[45px] w-auto pl-[10px] pr-[10px] theamColor text-[#f6f6f6] rounded-[20px] text-[0.8rem] addFont mt-[5px] md:mt-[15px] md:pl-[20px] md:pr-[20px]">
            Add Money To Your Wallet
          </button>
        </div>
        <div className="flex-1 w-[95%] flex flex-col theamColor text-[#f6f6f6] p-2 relative addShadow rounded-md md:pl-[30px]">
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
    </div>
  );
};
