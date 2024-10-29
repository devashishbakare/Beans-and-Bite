import React, { useState, useRef } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import { SignInSchema } from "../ValidationSchema/SignIn";
import { SignUpSchema } from "../ValidationSchema/signUp";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { userSignIn, userSignUp } from "../utils/api";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/notification";
import { baseUrl } from "../utils/Constant";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateToken } from "../redux/slices/userAuthSlice";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { updateSignInUpModal } from "../redux/slices/userAuthSlice";
import { setNotificationDetails } from "../redux/slices/notificationSlice";
import { ResetPasswordSchema } from "../ValidationSchema/resetPassword";
import { ForgotPasswordSchema } from "../ValidationSchema/forgotPassword";
import { forgotPassword } from "../utils/api";
export const SignInUpModal = () => {
  //todo : notification not working, check that once
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInPasswordStatus, setShowSignInPasswordStatus] =
    useState(false);
  const [showSingUpPasswordStatus, setShowSignUpPasswordStatus] =
    useState(false);
  const [showSingUpConfirmPasswordStatus, setShowSignUpConfirmPasswordStatus] =
    useState(false);
  const signInInitialValue = {
    userName: "",
    password: "",
  };

  const signUpInitialValue = {
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  };

  const forgotPasswordInitialvalue = {
    email: "",
  };

  const [request, setRequest] = useState("signIn");
  const handleOutSideBoxCloseModal = (event) => {
    if (event.target.id == "modalParent") {
      dispatch(updateSignInUpModal({ requestFor: "close" }));
    }
  };

  const signInFormik = useFormik({
    initialValues: { ...signInInitialValue, formType: "signin" },
    validationSchema: SignInSchema,
    onSubmit: async (values, action) => {
      setIsLoading(true);
      const response = await userSignIn(values);
      const { token, cartCount, favouriteCount, favourites, wallet } =
        response.data;
      if (response.success) {
        showSuccessNotification("Sign In has been Successful");
        dispatch(updateToken({ token: token, isAuthenticated: true }));
        dispatch(
          setNotificationDetails({
            cartCount,
            favouriteCount,
            favourites,
            wallet,
          })
        );
        dispatch(updateSignInUpModal({ requestFor: "close" }));
      } else {
        showErrorNotification("Something went wrong, please try again later");
      }
      setIsLoading(false);
      action.resetForm();
    },
  });

  const signUpFormik = useFormik({
    initialValues: { ...signUpInitialValue, formType: "signup" },
    validationSchema: SignUpSchema,
    onSubmit: async (values, action) => {
      setIsLoading(true);
      const response = await userSignUp(values);
      if (response.success) {
        showSuccessNotification("Sign up has been Successful");
        dispatch(updateToken({ token: response.data, isAuthenticated: true }));
        dispatch(updateSignInUpModal({ requestFor: "close" }));
      } else {
        showErrorNotification("Something went wrong, please try again later");
      }
      setIsLoading(false);
      action.resetForm();
    },
  });

  const forgotPasswordFormik = useFormik({
    initialValues: {
      ...forgotPasswordInitialvalue,
      formType: "forgot Password",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, action) => {
      setIsLoading(true);
      const response = await forgotPassword(values.email);
      if (response.success) {
        showSuccessNotification("Email has been sent, Check your email");
      } else {
        showErrorNotification("Something went wrong, please try again later");
      }
      setIsLoading(false);
      action.resetForm();
    },
  });

  const handleGoogleClick = () => {
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <div
      onClick={(e) => handleOutSideBoxCloseModal(e)}
      className="fixed inset-0 centerDiv z-[9999] bg-black bg-opacity-15"
      id="modalParent"
    >
      <div className="h-auto w-[350px] flex flex-col bg-[#f6f6f6] relative rounded-lg addShadow md:w-auto">
        <span
          onClick={() => dispatch(updateSignInUpModal({ requestFor: "close" }))}
          className="absolute right-1 top-0 h-[60px] w-[60px] centerDiv cursor-pointer"
        >
          <IoCloseCircleSharp className="text-[1.7rem]" />
        </span>
        <div className="h-[60px] w-[80%]">
          {request == "signIn" && (
            <span className="text-[1.1rem] addFont pl-4 h-full w-full flex items-center">
              Login to Beans and Bite
            </span>
          )}
          {request == "signUp" && (
            <span className="text-[1.1rem] addFont pl-4 h-full w-full flex items-center">
              Sign up to Beans and Bite
            </span>
          )}
          {request == "forgotPassword" && (
            <span className="text-[1.1rem] addFont pl-4 h-full w-full flex items-center">
              Reset Your Password
            </span>
          )}
        </div>
        {request == "signIn" && (
          <form
            onSubmit={signInFormik.handleSubmit}
            className="h-auto w-[350px] flex flex-col p-2 gap-3 md:w-[500px]"
          >
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">username</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="userName"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter Email Id or Mobile Number"
                  value={signInFormik.values.userName}
                  onChange={signInFormik.handleChange}
                  onBlur={signInFormik.handleBlur}
                  data-testid="signIn-userName"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {signInFormik.errors.userName && signInFormik.touched.userName ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {signInFormik.errors.userName}
                </span>
              ) : null}
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">password</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <div className="h-full w-full flex items-center gap-2">
                  <input
                    type={showSignInPasswordStatus ? "text" : "password"}
                    name="password"
                    className="h-[40px] w-[80%] outline-none pl-2 bg-[#f6f6f6] placeHolder"
                    placeholder="Enter password"
                    value={signInFormik.values.password}
                    onChange={signInFormik.handleChange}
                    onBlur={signInFormik.handleBlur}
                    data-testid="signIn-password"
                  />
                  <span
                    onClick={() =>
                      setShowSignInPasswordStatus(!showSignInPasswordStatus)
                    }
                    className="h-full w-[17%] mr-2 centerDiv"
                  >
                    {showSignInPasswordStatus == false ? (
                      <GoEyeClosed className="text-[1.3rem]" />
                    ) : (
                      <GoEye className="text-[1.3rem]" />
                    )}
                  </span>
                </div>
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {signInFormik.errors.password && signInFormik.touched.password ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {signInFormik.errors.password}
                </span>
              ) : null}
            </div>
            <div className="h-[50px] w-full flex items-center pl-4 gap-1 text-[0.9rem]">
              Don't Have an account?{" "}
              <span
                onClick={() => setRequest("signUp")}
                className="baseColor underline cursor-pointer"
                data-testid="showSignUpForm"
              >
                SignUp
              </span>
            </div>
            <div className="h-auto w-full flex flex-col centerDiv p-2">
              <button
                type="submit"
                className="h-[50px] w-[80%] rounded-[25px] theamColor cursor-pointer"
                data-testid="signInButton"
              >
                {isLoading ? (
                  <div className="h-full w-full centerDiv">
                    <CircularSpinner />
                  </div>
                ) : (
                  <span className="addFont text-[1rem] text-white">Login</span>
                )}
              </button>
            </div>
            <div className="h-auto w-full flex flex-col p-2">
              <div className="h-[30px] w-full centerDiv gap-2">
                <span className="addFont text-[0.85rem]">
                  forgot your password?
                </span>
                <span
                  onClick={() => setRequest("forgotPassword")}
                  className="addFont baseColor underline text-[0.9rem] cursor-pointer"
                >
                  Reset Here
                </span>
              </div>
              <div className="h-[50px] w-full centerDiv gap-2">
                <span className="w-[40%] border-[1px] border-gray-400"></span>
                <span className="">OR</span>
                <span className="w-[40%] border-[1px] border-gray-400"></span>
              </div>
              <div
                onClick={() => handleGoogleClick()}
                className="h-[65px] w-full centerDiv cursor-pointer"
              >
                <FcGoogle className="text-[2.5rem]" />
              </div>
            </div>
          </form>
        )}
        {request == "signUp" && (
          <form
            onSubmit={signUpFormik.handleSubmit}
            className="h-auto w-[350px] max-h-[610px] overflow-y-scroll flex flex-col p-2 gap-1 md:w-[500px]"
          >
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">name</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="name"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter name"
                  value={signUpFormik.values.name}
                  onChange={signUpFormik.handleChange}
                  onBlur={signUpFormik.handleBlur}
                  data-testid="signUpName"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {signUpFormik.errors.name && signUpFormik.touched.name ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {signUpFormik.errors.name}
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
                  value={signUpFormik.values.email}
                  onChange={signUpFormik.handleChange}
                  onBlur={signUpFormik.handleBlur}
                  data-testid="signUpEmail"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {signUpFormik.errors.email && signUpFormik.touched.email ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {signUpFormik.errors.email}
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
                  value={signUpFormik.values.mobileNumber}
                  onChange={signUpFormik.handleChange}
                  onBlur={signUpFormik.handleBlur}
                  data-testid="signUpMobileNumber"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {signUpFormik.errors.mobileNumber &&
              signUpFormik.touched.mobileNumber ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {signUpFormik.errors.mobileNumber}
                </span>
              ) : null}
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">create password</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <div className="h-full w-full flex items-center gap-2">
                  <input
                    type={showSingUpPasswordStatus ? "text" : "password"}
                    name="password"
                    className="h-[40px] w-[80%] outline-none pl-2 bg-[#f6f6f6] placeHolder"
                    placeholder="Enter password"
                    value={signUpFormik.values.password}
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    data-testid="signUpPassword"
                  />
                  <span
                    onClick={() =>
                      setShowSignUpPasswordStatus(!showSingUpPasswordStatus)
                    }
                    className="h-full w-[17%] mr-2 centerDiv"
                  >
                    {showSignInPasswordStatus == false ? (
                      <GoEyeClosed className="text-[1.3rem]" />
                    ) : (
                      <GoEye className="text-[1.3rem]" />
                    )}
                  </span>
                </div>
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {signUpFormik.errors.password && signUpFormik.touched.password ? (
                <span className="h-auto w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {signUpFormik.errors.password}
                </span>
              ) : null}
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">confirm password</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <div className="h-full w-full flex items-center gap-2">
                  <input
                    type={showSingUpConfirmPasswordStatus ? "text" : "password"}
                    name="confirmPassword"
                    className="h-[40px] w-[80%] outline-none pl-2 bg-[#f6f6f6] placeHolder"
                    placeholder="Re-enter password"
                    value={signUpFormik.values.confirmPassword}
                    onChange={signUpFormik.handleChange}
                    onBlur={signUpFormik.handleBlur}
                    data-testid="signUpConfirmPassword"
                  />
                  <span
                    onClick={() =>
                      setShowSignUpConfirmPasswordStatus(
                        !showSingUpConfirmPasswordStatus
                      )
                    }
                    className="h-full w-[17%] mr-2 centerDiv"
                  >
                    {showSingUpConfirmPasswordStatus == false ? (
                      <GoEyeClosed className="text-[1.3rem]" />
                    ) : (
                      <GoEye className="text-[1.3rem]" />
                    )}
                  </span>
                </div>
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {signUpFormik.errors.confirmPassword &&
              signUpFormik.touched.confirmPassword ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {signUpFormik.errors.confirmPassword}
                </span>
              ) : null}
            </div>
            <div className="h-[50px] w-full flex items-center pl-4 gap-1 text-[0.9rem]">
              Already Have an account?{" "}
              <span
                onClick={() => setRequest("signIn")}
                className="baseColor underline cursor-pointer"
              >
                SignIn
              </span>
            </div>
            <div className="h-auto w-full flex flex-col centerDiv p-2 mt-2">
              <button
                type="submit"
                className="h-[50px] w-[80%] rounded-[25px] theamColor cursor-pointer centerDiv"
                data-testid="signUpButton"
              >
                {isLoading ? (
                  <div className="h-full w-full centerDiv">
                    <CircularSpinner />
                  </div>
                ) : (
                  <span className="addFont text-[1rem] text-white">
                    Sign Up
                  </span>
                )}
              </button>
            </div>
            <div className="h-auto w-full flex flex-col p-2">
              <div className="h-[50px] w-full centerDiv gap-2">
                <span className="w-[40%] border-[1px] border-gray-400"></span>
                <span className="">OR</span>
                <span className="w-[40%] border-[1px] border-gray-400"></span>
              </div>
              <div
                onClick={() => handleGoogleClick()}
                className="h-[65px] w-full centerDiv cursor-pointer"
              >
                <FcGoogle className="text-[2.5rem]" />
              </div>
            </div>
          </form>
        )}
        {request == "forgotPassword" && (
          <form
            onSubmit={forgotPasswordFormik.handleSubmit}
            className="h-auto w-[350px] max-h-[610px] overflow-y-scroll flex flex-col items-center p-2 gap-1 md:w-[500px]"
          >
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">Email</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="email"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter your email"
                  value={forgotPasswordFormik.values.email}
                  onChange={forgotPasswordFormik.handleChange}
                  onBlur={forgotPasswordFormik.handleBlur}
                  //data-testid="signUpemail"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {forgotPasswordFormik.errors.email &&
              forgotPasswordFormik.touched.email ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {forgotPasswordFormik.errors.email}
                </span>
              ) : null}
            </div>

            <div className="h-auto w-full flex p-2 mt-[10px]">
              <div className="h-auto w-full flex flex-col gap-[10px]  ml-[10px]">
                <span className="capitalize addFont ml-1">How it works</span>
                <span className="text-[0.85rem] addFont opacity-80 ml-1">
                  Please enter the email address associated with your account.
                </span>
                <span className="text-[0.85rem] addFont opacity-80 ml-1">
                  After submitting, you will receive an email with a password
                  reset link.
                </span>
                <span className="text-[0.85rem] addFont opacity-80 ml-1">
                  Open the email and click on the provided link to reset your
                  password within 60 minutes.
                </span>
                <span className="text-[0.85rem] addFont opacity-80 ml-1">
                  Once redirected, reset your password.
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="h-[45px] w-[80%] rounded-[25px] theamColor cursor-pointer centerDiv mt-[30px] mb-[20px]"
            >
              {isLoading ? (
                <div className="h-full w-full centerDiv">
                  <CircularSpinner />
                </div>
              ) : (
                <span className="addFont text-[1rem] text-white">
                  Request Password Reset
                </span>
              )}
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
