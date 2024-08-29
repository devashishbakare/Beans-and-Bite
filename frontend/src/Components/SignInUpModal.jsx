import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

export const SignInUpModal = ({ closeSignInUpModal }) => {
  const [userSigningIn, setUserSigningIn] = useState(true);
  const handleOutSideBoxCloseModal = (event) => {
    if (event.target.id == "modalParent") {
      closeSignInUpModal();
    }
  };

  return (
    <div
      onClick={(e) => handleOutSideBoxCloseModal(e)}
      className="fixed inset-0 centerDiv z-[9999] bg-black bg-opacity-15"
      id="modalParent"
    >
      <div className="h-auto w-[350px] flex flex-col bg-[#f6f6f6] relative rounded-lg addShadow md:w-auto">
        <span
          onClick={() => closeSignInUpModal()}
          className="absolute right-1 top-0 h-[60px] w-[60px] centerDiv cursor-pointer"
        >
          <IoCloseCircleSharp className="text-[1.7rem]" />
        </span>
        <div className="h-[60px] w-[80%]">
          {userSigningIn ? (
            <span className="text-[1.1rem] addFont pl-4 h-full w-full flex items-center">
              Login to Beans and Bite
            </span>
          ) : (
            <span className="text-[1.1rem] addFont pl-3 h-full w-full flex items-center">
              Sign up to Beans and Bite
            </span>
          )}
        </div>
        {userSigningIn ? (
          <div className="h-auto w-[350px] flex flex-col p-2 gap-3 md:w-[500px]">
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">username</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="email"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter Email Id or Mobile Number"
                  // value={signInFormik.values.email}
                  // onChange={signInFormik.handleChange}
                  // onBlur={signInFormik.handleBlur}
                  // data-testid="signIn-email-input-testid"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">password</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="password"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter password"
                  // value={signInFormik.values.email}
                  // onChange={signInFormik.handleChange}
                  // onBlur={signInFormik.handleBlur}
                  // data-testid="signIn-email-input-testid"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
            </div>
            <div className="h-[50px] w-full flex items-center pl-4 gap-1 text-[0.9rem]">
              Don't Have an account?{" "}
              <span
                onClick={() => setUserSigningIn(false)}
                className="baseColor underline cursor-pointer"
              >
                SignUp
              </span>
            </div>
            <div className="h-auto w-full flex flex-col centerDiv p-2">
              <button className="h-[50px] w-[80%] rounded-[25px] addFont theamColor text-white cursor-pointer">
                Login
              </button>
            </div>
            <div className="h-auto w-full flex flex-col p-2">
              <div className="h-[30px] w-full centerDiv gap-2">
                <span className="addFont text-[0.7rem]">
                  Already register with mobile number?
                </span>
                <span className="addFont baseColor underline text-[0.9rem] cursor-pointer">
                  Get OTP
                </span>
              </div>
              <div className="h-[50px] w-full centerDiv gap-2">
                <span className="w-[40%] border-[1px] border-gray-400"></span>
                <span className="">OR</span>
                <span className="w-[40%] border-[1px] border-gray-400"></span>
              </div>
              <div className="h-[65px] w-full centerDiv cursor-pointer">
                <FcGoogle className="text-[2.5rem]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-auto w-[350px] max-h-[600px] overflow-y-scroll flex flex-col p-2 gap-1 md:w-[500px]">
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">email id</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="email"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter Email Id"
                  // value={signInFormik.values.email}
                  // onChange={signInFormik.handleChange}
                  // onBlur={signInFormik.handleBlur}
                  // data-testid="signIn-email-input-testid"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">mobile number</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="mobileNumber"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter Email Id or Mobile Number"
                  // value={signInFormik.values.email}
                  // onChange={signInFormik.handleChange}
                  // onBlur={signInFormik.handleBlur}
                  // data-testid="signIn-email-input-testid"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">create password</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="password"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter Email Id or Mobile Number"
                  // value={signInFormik.values.email}
                  // onChange={signInFormik.handleChange}
                  // onBlur={signInFormik.handleBlur}
                  // data-testid="signIn-email-input-testid"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2">confirm password</span>
              <div className="h-[50px] w-full flex items-center bg-[#f6f6f6] flex-col">
                <input
                  type="text"
                  name="confirmPassword"
                  className="h-[40px] w-full outline-none pl-2 bg-[#f6f6f6] placeHolder"
                  placeholder="Enter Email Id or Mobile Number"
                  // value={signInFormik.values.email}
                  // onChange={signInFormik.handleChange}
                  // onBlur={signInFormik.handleBlur}
                  // data-testid="signIn-email-input-testid"
                />
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
            </div>
            <div className="h-[50px] w-full flex items-center pl-4 gap-1 text-[0.9rem]">
              Already Have an account?{" "}
              <span
                onClick={() => setUserSigningIn(true)}
                className="baseColor underline cursor-pointer"
              >
                SignIn
              </span>
            </div>
            <div className="h-auto w-full flex flex-col centerDiv p-2">
              <button className="h-[50px] w-[80%] rounded-[25px] addFont theamColor text-white cursor-pointer">
                Sign Up
              </button>
            </div>
            <div className="h-auto w-full flex flex-col p-2">
              <div className="h-[30px] w-full centerDiv gap-2">
                <span className="addFont text-[0.7rem]">
                  Register with mobile number,
                </span>
                <span className="addFont baseColor underline text-[0.9rem] cursor-pointer">
                  Get OTP
                </span>
              </div>
              <div className="h-[50px] w-full centerDiv gap-2">
                <span className="w-[40%] border-[1px] border-gray-400"></span>
                <span className="">OR</span>
                <span className="w-[40%] border-[1px] border-gray-400"></span>
              </div>
              <div className="h-[65px] w-full centerDiv cursor-pointer">
                <FcGoogle className="text-[2.5rem]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
