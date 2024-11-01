import React, { useState } from "react";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "../ValidationSchema/resetPassword";
import { updatePassword } from "../utils/api";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../utils/notification";
import { useNavigate, useParams } from "react-router-dom";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { useDispatch } from "react-redux";
import {
  updateSignInUpModal,
  updateToken,
} from "../redux/slices/userAuthSlice";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { setNotificationDetails } from "../redux/slices/notificationSlice";
export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetPasswordToken } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPasswordStatus, setShowResetPasswordStatus] = useState(false);
  const [showResetConfirmPasswordStatus, setShowResetConfirmPasswordStatus] =
    useState(false);
  const initialValues = {
    password: "",
    confirm_password: "",
  };
  const ResetPasswordFormik = useFormik({
    initialValues: { ...initialValues, formType: "resetPassword" },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, action) => {
      setIsLoading(true);
      const resetPasswordInfo = {
        password: values.password,
        resetPasswordToken,
      };
      const response = await updatePassword(resetPasswordInfo);
      const { token, cartCount, favouriteCount, favourites, wallet } =
        response.data;
      //console.log(response.data);
      if (response.success) {
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
        setTimeout(() => {
          showSuccessNotification("Password Has Been Reset Successfully");
        }, 1000);
        navigate("/");
      } else {
        showErrorNotification(
          "Password reset token is invalid or has expired, Request Reset Password again"
        );
      }
      setIsLoading(false);
      action.resetForm();
    },
  });

  return (
    <div className="h-[100vh] w-full addBorder relative">
      <div className="centerToPage z-[8890] h-full w-full bg-black bg-opacity-15 centerDiv">
        <div className="h-auto w-[95%] max-w-[500px] flex flex-col bg-white rounded-md addShadow max-h-[530px] overflow-y-scroll">
          <div className="h-[60px] w-full">
            <span className="text-[1.1rem] addFont pl-4 h-full w-full flex items-center">
              Beans and Bite Reset Password
            </span>
          </div>
          <form
            onSubmit={ResetPasswordFormik.handleSubmit}
            className="h-auto w-full flex flex-col gap-1 max-w-[500px] mt-[20px]"
          >
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2 pl-1">Password</span>
              <div className="h-[50px] w-[97%] flex items-center bg-[#f6f6f6] flex-col mt-[10px] ml-2">
                <div className="h-full w-full flex items-center gap-2">
                  <input
                    type={showResetPasswordStatus ? "text" : "password"}
                    name="password"
                    className="h-[40px] w-[80%] outline-none pl-2 bg-[#f6f6f6] placeHolder"
                    placeholder="Enter password"
                    value={ResetPasswordFormik.values.password}
                    onChange={ResetPasswordFormik.handleChange}
                    onBlur={ResetPasswordFormik.handleBlur}
                  />
                  <span
                    onClick={() =>
                      setShowResetPasswordStatus(!showResetPasswordStatus)
                    }
                    className="h-full w-[17%] mr-2 centerDiv"
                  >
                    {showResetPasswordStatus == false ? (
                      <GoEyeClosed className="text-[1.3rem]" />
                    ) : (
                      <GoEye className="text-[1.3rem]" />
                    )}
                  </span>
                </div>
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {ResetPasswordFormik.errors.password &&
              ResetPasswordFormik.touched.password ? (
                <span className="h-auto w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {ResetPasswordFormik.errors.password}
                </span>
              ) : null}
            </div>
            <div className="h-[100px] w-full flex flex-col p-2">
              <span className="uppercase addFont ml-2 pl-1">
                confirm password
              </span>
              <div className="h-[50px] w-[97%] flex items-center bg-[#f6f6f6] flex-col  mt-[10px] ml-2">
                <div className="h-full w-full flex items-center gap-2">
                  <input
                    type={showResetConfirmPasswordStatus ? "text" : "password"}
                    name="confirm_password"
                    className="h-[40px] w-[80%] outline-none pl-2 bg-[#f6f6f6] placeHolder"
                    placeholder="Re-enter password"
                    value={ResetPasswordFormik.values.confirm_password}
                    onChange={ResetPasswordFormik.handleChange}
                    onBlur={ResetPasswordFormik.handleBlur}
                    data-testid="signUpConfirmPassword"
                  />
                  <span
                    onClick={() =>
                      setShowResetConfirmPasswordStatus(
                        !showResetConfirmPasswordStatus
                      )
                    }
                    className="h-full w-[17%] mr-2 centerDiv"
                  >
                    {showResetConfirmPasswordStatus == false ? (
                      <GoEyeClosed className="text-[1.3rem]" />
                    ) : (
                      <GoEye className="text-[1.3rem]" />
                    )}
                  </span>
                </div>
                <span className="w-[98%] border-[1px] border-gray-500 ml-2"></span>
              </div>
              {ResetPasswordFormik.errors.confirm_password &&
              ResetPasswordFormik.touched.confirm_password ? (
                <span className="h-[30px] w-[98%] text-[0.8rem] ml-2 pl-1 bg-[#f6dae7] text-red-600 font-thin">
                  {ResetPasswordFormik.errors.confirm_password}
                </span>
              ) : null}
            </div>
            <div className="h-[130px] w-full centerDiv pb-[20px]">
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
                    Reset Password
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
