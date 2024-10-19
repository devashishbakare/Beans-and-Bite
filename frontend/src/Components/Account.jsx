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
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/notification";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { MdArticle } from "react-icons/md";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
import { resetUserAuth } from "../redux/slices/userAuthSlice";
import { resetProductSlice } from "../redux/slices/productSlice";
import { resetNavbarSlice } from "../redux/slices/NavbarSlice";
import { resetHistory } from "../redux/slices/historySlice";
import { resetProductInfo } from "../redux/slices/ProductInfoSlice";
import { resetNotification } from "../redux/slices/notificationSlice";
import { resetCart } from "../redux/slices/cartSlice";
import { persistor } from "../redux/store";
import { updateFavouriteOnLogout } from "../utils/api";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { useFormik } from "formik";
import { IoCloseCircleSharp } from "react-icons/io5";
import { editProfileSchema } from "../ValidationSchema/EditProfile";
import { editUserDetails } from "../utils/api";
export const Account = () => {
  //todo : user loader and test the API
  const editProfileInitialValue = {
    userName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const { token } = useSelector((state) => state.userAuth);
  const { favorites } = useSelector((state) => state.notification);
  const [isLoading, setIsLoading] = useState(false);
  const [editFormLoader, setEditFormLoader] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditConfirmPasswordStatus, setShowEditConfirmPasswordStatus] =
    useState(false);
  const [showEditPasswordStatus, setShowEditPasswordStatus] = useState(false);
  useEffect(() => {
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Account" }));
    };
    const getUserDetails = async (token) => {
      setIsLoading(true);
      const response = await fetchUserDetails(token);
      if (response.success) {
        // console.log(response.data);
        editProfileFormik.setValues({
          userName: response.data.name,
          email: response.data.email,
          mobileNumber: response.data.mobileNumber,
          password: "",
          confirmPassword: "",
          formType: "editProfile",
        });
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

  const handleLogOut = async () => {
    const response = await updateFavouriteOnLogout(token, favorites);
    // console.log(response.message);
    dispatch(resetUserAuth());
    dispatch(resetProductSlice());
    dispatch(resetNavbarSlice());
    dispatch(resetHistory());
    dispatch(resetProductInfo());
    dispatch(resetNotification());
    dispatch(resetCart());
    persistor.purge();
    dispatch(updateNavbarOptionSelection({ option: "Home" }));
  };

  const editProfileFormik = useFormik({
    initialValues: { ...editProfileInitialValue, formType: "editProfile" },
    validationSchema: editProfileSchema,
    onSubmit: async (values, action) => {
      setEditFormLoader(true);
      const response = await editUserDetails(token, values);
      if (response.success) {
        showSuccessNotification("Details has been updated");
        setShowEditProfileModal(false);
      } else {
        showErrorNotification("Something went wrong, please try again later");
      }
      // console.log(values);
      setEditFormLoader(false);
      action.resetForm();
    },
  });

  const handleOutsideModalClick = (event) => {
    if (event.target.id == "outsideModal") {
      setShowEditProfileModal(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col centerDiv relative">
      {showEditProfileModal && (
        <div
          id="outsideModal"
          onClick={(e) => handleOutsideModalClick(e)}
          className="centerToPage z-[8890] h-full w-full bg-black bg-opacity-15 centerDiv"
        >
          <form
            onSubmit={editProfileFormik.handleSubmit}
            className="h-auto w-[90%] max-h-[550px] overflow-y-scroll flex flex-col p-2 gap-1 bg-[#f4f4f4] addShadow rounded-md relative md:w-[500px] md:max-h-[600px]"
          >
            <span
              onClick={() => setShowEditProfileModal(false)}
              className="absolute t-0 right-4 h-[50px] w-[50px] centerDiv"
            >
              <IoCloseCircleSharp className="text-[2rem]" />
            </span>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">Username</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="userName"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter name"
                  value={editProfileFormik.values.userName}
                  onChange={editProfileFormik.handleChange}
                  onBlur={editProfileFormik.handleBlur}
                  data-testid="userNameTest"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {editProfileFormik.errors.userName &&
              editProfileFormik.touched.userName ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {editProfileFormik.errors.userName}
                </span>
              ) : null}
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">email id</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="email"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter Email Id"
                  value={editProfileFormik.values.email}
                  onChange={editProfileFormik.handleChange}
                  onBlur={editProfileFormik.handleBlur}
                  data-testid="emailTest"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {editProfileFormik.errors.email &&
              editProfileFormik.touched.email ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {editProfileFormik.errors.email}
                </span>
              ) : null}
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">mobile number</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="mobileNumber"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter Mobile Number"
                  value={editProfileFormik.values.mobileNumber}
                  onChange={editProfileFormik.handleChange}
                  onBlur={editProfileFormik.handleBlur}
                  data-testid="mobileNumberTest"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {editProfileFormik.errors.mobileNumber &&
              editProfileFormik.touched.mobileNumber ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {editProfileFormik.errors.mobileNumber}
                </span>
              ) : null}
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">password</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <div className="h-full w-full flex items-center gap-2">
                  <input
                    type={showEditPasswordStatus ? "text" : "password"}
                    name="password"
                    className="h-[40px] w-[80%] outline-none pl-2 bg-[#f6f6f6] placeHolder"
                    placeholder="Enter password"
                    value={editProfileFormik.values.password}
                    onChange={editProfileFormik.handleChange}
                    onBlur={editProfileFormik.handleBlur}
                    data-testid="passwordTest"
                  />
                  <span
                    onClick={() =>
                      setShowEditPasswordStatus(!showEditPasswordStatus)
                    }
                    className="h-full w-[17%] mr-2 centerDiv"
                  >
                    {showEditPasswordStatus == false ? (
                      <GoEyeClosed className="text-[1.3rem]" />
                    ) : (
                      <GoEye className="text-[1.3rem]" />
                    )}
                  </span>
                </div>
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {editProfileFormik.errors.password &&
              editProfileFormik.touched.password ? (
                <span className="h-auto w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {editProfileFormik.errors.password}
                </span>
              ) : null}
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">confirm password</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <div className="h-full w-full flex items-center gap-2">
                  <input
                    type={showEditConfirmPasswordStatus ? "text" : "password"}
                    name="confirmPassword"
                    className="h-[40px] w-[80%] outline-none pl-2 bg-[#f6f6f6] placeHolder"
                    placeholder="Re-enter password"
                    value={editProfileFormik.values.confirmPassword}
                    onChange={editProfileFormik.handleChange}
                    onBlur={editProfileFormik.handleBlur}
                    data-testid="confirmPasswordTest"
                  />
                  <span
                    onClick={() =>
                      setShowEditConfirmPasswordStatus(
                        !showEditConfirmPasswordStatus
                      )
                    }
                    className="h-full w-[17%] mr-2 centerDiv"
                  >
                    {showEditConfirmPasswordStatus == false ? (
                      <GoEyeClosed className="text-[1.3rem]" />
                    ) : (
                      <GoEye className="text-[1.3rem]" />
                    )}
                  </span>
                </div>
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {editProfileFormik.errors.confirmPassword &&
              editProfileFormik.touched.confirmPassword ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {editProfileFormik.errors.confirmPassword}
                </span>
              ) : null}
            </div>
            <div className="h-auto w-full flex flex-col centerDiv p-2">
              <button
                type="submit"
                className="h-[50px] w-[80%] rounded-[25px] theamColor cursor-pointer"
                data-testid="editProfileButtonTest"
              >
                {editFormLoader ? (
                  <div className="h-full w-full centerDiv">
                    <CircularSpinner />
                  </div>
                ) : (
                  <span className="addFont text-[0.95rem] text-white">
                    Edit Profile
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="h-[70px] w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px]">
          <History />
        </div>
      </div>
      {isLoading == true ? (
        <div className="h-full w-full bg-black bg-opacity-15 centerDiv p-2 rounded-md">
          <div className="h-[150px] w-[250px] bg-white flex flex-col items-center p-2 addShadow rounded-md">
            <span className="h-[50%] w-full text-center addFont">
              we are processing your request please wait
            </span>
            <span className="h-[50%] w-full centerDiv">
              <CircularSpinner />
            </span>
          </div>
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
              <div
                onClick={() => handleChangeComponent("orderHistory")}
                className="h-[70px] w-full flex cursor-pointer mt-[30px]"
              >
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
              <div
                onClick={() => handleChangeComponent("Wallet")}
                className="h-[70px] w-full flex cursor-pointer"
              >
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
              <div
                onClick={() => handleChangeComponent("Cart")}
                className="h-[70px] w-full flex cursor-pointer"
              >
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

              <div
                onClick={() => handleChangeComponent("favourite")}
                className="h-[70px] w-full flex cursor-pointer"
              >
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
              <div
                onClick={() =>
                  dispatch(updateNavbarOptionSelection({ option: "Article" }))
                }
                className="h-[70px] w-full flex cursor-pointer"
                data-testid="editProfileDiv"
              >
                <div className="h-full flex-1 flex md:pl-[30px]">
                  <span className="h-full w-[60px] centerDiv">
                    <MdArticle className="text-[1.7rem] baseColor" />
                  </span>
                  <span className="h-full flex-1 text-[1.1rem] addFont flex items-center ml-[10px] uppercase baseColor md:text-[1.2rem]">
                    Articles
                  </span>
                </div>
                <span className="h-full w-[60px] centerDiv">
                  <FaAngleRight className="text-[1.4rem]" />
                </span>
              </div>
              <hr className="border-[1px] w-[90%] border-gray-300 md:w-[100%]" />
              <div
                onClick={() => setShowEditProfileModal(true)}
                className="h-[70px] w-full flex cursor-pointer"
                data-testid="editProfileDiv"
              >
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
              <div
                onClick={() => handleLogOut()}
                className="h-[70px] w-full flex cursor-pointer"
              >
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
