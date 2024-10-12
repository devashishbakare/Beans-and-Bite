import React, { useEffect, useState } from "react";
import { History } from "./History";
import { useDispatch, useSelector } from "react-redux";
import { addFromNavbar } from "../redux/slices/historySlice";
import { FaAngleRight } from "react-icons/fa6";
import { FaEdit, FaHeart } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { CiCoffeeCup, CiGift } from "react-icons/ci";
import { IoWallet } from "react-icons/io5";
import { RiLogoutCircleFill } from "react-icons/ri";
import { fetchUserDetails } from "../utils/api";
import { ToastContainer } from "react-toastify";
import { showErrorNotification } from "../utils/notification";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
export const Account = () => {
  //todo : user loader and test the API
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const { token } = useSelector((state) => state.userAuth);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Account" }));
    };
    const getUserDetails = async (token) => {
      setIsLoading(true);
      const response = await fetchUserDetails(token);
      console.log(response);
      if (response.success) {
        setUserDetails(response.data);
      } else {
        showErrorNotification("something went wrong, please try again later");
      }
      setIsLoading(false);
    };
    updateHistory();
    getUserDetails(token);
  }, [token]);

  const handleChangeComponent = (optionName) => {
    dispatch(updateNavbarOptionSelection({ option: optionName }));
  };

  return (
    <div className="h-full w-full flex flex-col centerDiv">
      <div className="h-[70px] w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px]">
          <History />
        </div>
      </div>
      {isLoading == true ? (
        <div className="h-full w-full bg-white centerDiv p-2 rounded-md">
          <span className="h-[50%] w-full text-center addFont">
            we are processing your request please wait
          </span>
          <span className="h-[50%] w-full centerDiv">
            <CircularSpinner />
          </span>
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col overflow-y-scroll theamColor">
          <div className="h-[450px] w-full theamColor centerDiv shrink-0 relative">
            <div className="absolute bottom-0 right-1">
              <img
                src="http://res.cloudinary.com/djgouef8q/image/upload/v1728702296/tavqissdlykuchvpkcw3.svg"
                alt="AstheticImage"
                className="h-[80px] w-[80px] bg-cover md:h-[110px] md:w-[110px]"
              />
            </div>
            <div className="h-[260px] w-[300px] flex flex-col items-center lg:h-[290px]">
              <div className="h-[202px] w-[202px] centerDiv rounded-[50%] border-[3px] border-[#e3e3e0] lg:h-[232px] lg:w-[232px]">
                <div className="h-[190px] w-[190px] centerDiv rounded-[50%] border-[3px] border-[#e6c10d8a] lg:h-[220px] lg:w-[220px]">
                  <img
                    src="http://res.cloudinary.com/djgouef8q/image/upload/v1728702594/gw2yxwjpsmlzwa9xewn8.svg"
                    alt="profileImage"
                    className="h-[180px] w-[180px] bg-cover rounded-[50%] lg:h-[210px] lg:w-[210px]"
                  />
                </div>
              </div>
              <div className="flex-1 w-full centerDiv addFont text-[#e3e3e0] text-[1.3rem] font-bold">
                {userDetails.name}
                {/* John Doe */}
              </div>
            </div>

            <div className="absolute top-0 left-0">
              <img
                src="http://res.cloudinary.com/djgouef8q/image/upload/v1728702402/wu9tzbgbrrcz76wri6wh.svg"
                alt="AstheticImage"
                className="h-[90px] w-[90px] bg-cover md:h-[120px] md:w-[120px]"
              />
            </div>
          </div>
          <div className="h-auto w-full centerDiv shrink-0 bg-[#f4f4f4] rounded-t-3xl">
            <div className="h-auto w-full max-w-[1050px] p-2 flex flex-col items-center gap-1">
              <div className="h-[70px] w-full flex cursor-pointer mt-[30px]">
                <div className="h-full flex-1 flex md:pl-[30px]">
                  <span className="h-full w-[60px] centerDiv">
                    <CiCoffeeCup className="text-[2rem] baseColor" />
                  </span>
                  <span className="h-full flex-1 text-[1.1rem] addFont flex items-center ml-[10px] uppercase baseColor md:text-[1.2rem]">
                    Order
                  </span>
                </div>
                <span className="h-full w-[60px] centerDiv">
                  <FaAngleRight className="text-[1.4rem]" />
                </span>
              </div>
              <hr className="border-[1px] w-[90%] border-gray-300 md:w-[100%]" />
              <div
                onClick={() => handleChangeComponent("giftHistory")}
                className="h-[70px] w-full flex cursor-pointer"
              >
                <div className="h-full flex-1 flex md:pl-[30px]">
                  <span className="h-full w-[60px] centerDiv">
                    <CiGift className="text-[1.9rem] baseColor" />
                  </span>
                  <span className="h-full flex-1 text-[1.1rem] addFont flex items-center ml-[10px] uppercase baseColor md:text-[1.2rem]">
                    Gift
                  </span>
                </div>
                <span className="h-full w-[60px] centerDiv">
                  <FaAngleRight className="text-[1.4rem]" />
                </span>
              </div>
              <hr className="border-[1px] w-[90%] border-gray-300 md:w-[100%]" />
              <div className="h-[70px] w-full flex cursor-pointer">
                <div className="h-full flex-1 flex md:pl-[30px]">
                  <span className="h-full w-[60px] centerDiv">
                    <IoWallet className="text-[1.7rem] baseColor" />
                  </span>
                  <span className="h-full flex-1 text-[1.1rem] addFont flex items-center ml-[10px] uppercase baseColor md:text-[1.2rem]">
                    Wallet
                  </span>
                </div>
                <span className="h-full w-[60px] centerDiv">
                  <FaAngleRight className="text-[1.4rem]" />
                </span>
              </div>
              <hr className="border-[1px] w-[90%] border-gray-300 md:w-[100%]" />
              <div className="h-[70px] w-full flex cursor-pointer">
                <div className="h-full flex-1 flex md:pl-[30px]">
                  <span className="h-full w-[60px] centerDiv">
                    <IoCartSharp className="text-[1.7rem] baseColor" />
                  </span>
                  <span className="h-full flex-1 text-[1.1rem] addFont flex items-center ml-[10px] uppercase baseColor md:text-[1.2rem]">
                    Cart
                  </span>
                </div>
                <span className="h-full w-[60px] centerDiv">
                  <FaAngleRight className="text-[1.4rem]" />
                </span>
              </div>
              <hr className="border-[1px] w-[90%] border-gray-300 md:w-[100%]" />
              <div className="h-[70px] w-full flex cursor-pointer">
                <div className="h-full flex-1 flex md:pl-[30px]">
                  <span className="h-full w-[60px] centerDiv">
                    <FaHeart className="text-[1.5rem] baseColor" />
                  </span>
                  <span className="h-full flex-1 text-[1.1rem] addFont flex items-center ml-[10px] uppercase baseColor md:text-[1.2rem]">
                    Favourites
                  </span>
                </div>
                <span className="h-full w-[60px] centerDiv">
                  <FaAngleRight className="text-[1.4rem]" />
                </span>
              </div>
              <hr className="border-[1px] w-[90%] border-gray-300 md:w-[100%]" />
              <div className="h-[70px] w-full flex cursor-pointer">
                <div className="h-full flex-1 flex md:pl-[30px]">
                  <span className="h-full w-[60px] centerDiv">
                    <FaEdit className="text-[1.7rem] baseColor" />
                  </span>
                  <span className="h-full flex-1 text-[1.1rem] addFont flex items-center ml-[10px] uppercase baseColor md:text-[1.2rem]">
                    Edit Profile
                  </span>
                </div>
                <span className="h-full w-[60px] centerDiv">
                  <FaAngleRight className="text-[1.4rem]" />
                </span>
              </div>
              <hr className="border-[1px] w-[90%] border-gray-300 md:w-[100%]" />
              <div className="h-[70px] w-full flex cursor-pointer">
                <div className="h-full flex-1 flex md:pl-[30px]">
                  <span className="h-full w-[60px] centerDiv">
                    <RiLogoutCircleFill className="text-[1.7rem] baseColor" />
                  </span>
                  <span className="h-full flex-1 text-[1.1rem] addFont flex items-center ml-[10px] uppercase baseColor md:text-[1.2rem]">
                    Logout
                  </span>
                </div>
                <span className="h-full w-[60px] centerDiv">
                  <FaAngleRight className="text-[1.4rem]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};
