import React, { useState } from "react";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { MobileViewNavBar } from "./MobileViewNavBar";
import { Content } from "./Content";
import { SignInUpModal } from "./SignInUpModal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateToken,
  updateSignInUpModal,
} from "../redux/slices/userAuthSlice";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
import { useLocation } from "react-router-dom";
import { fetchNotificationDetails } from "../utils/api";
import { setNotificationDetails } from "../redux/slices/notificationSlice";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
export const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { signInUpModal } = useSelector((state) => state.userAuth);
  const { navbarOpationSelection, extraData } = useSelector(
    (state) => state.navbarSelection
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const updateUserDetails = async () => {
      const searchParams = new URLSearchParams(location.search);
      const newToken = searchParams.get("token");
      if (newToken) {
        setIsLoading(true);
        const response = await fetchNotificationDetails(newToken);
        const { cartCount, favouriteCount, favourites, wallet } = response.data;

        dispatch(updateToken({ token: newToken, isAuthenticated: true }));
        dispatch(
          setNotificationDetails({
            cartCount,
            favouriteCount,
            favourites,
            wallet,
          })
        );
        dispatch(updateSignInUpModal({ requestFor: "close" }));
        dispatch(
          updateNavbarOptionSelection({
            option: navbarOpationSelection,
            extraData,
          })
        );
        setIsLoading(false);
      }
    };

    updateUserDetails();
  }, [location.search, dispatch]);

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col-reverse relative sm:flex-col">
      {isLoading == true && (
        <div className="absolute h-full w-full bg-black bg-opacity-15 centerDiv p-2 rounded-md">
          <div className="h-[150px] w-[250px] bg-white flex flex-col items-center p-2 addShadow rounded-md">
            <span className="h-[50%] w-full text-center addFont">
              we are fetching your details, please wait
            </span>
            <span className="h-[50%] w-full centerDiv">
              <CircularSpinner />
            </span>
          </div>
        </div>
      )}

      <div className="hide sm:flex justify-center items-center h-[70px] w-full ">
        <Navbar />
      </div>
      <div className="h-[70px] w-full max-w-[1050px] centerDiv sm:hidden">
        <MobileViewNavBar />
      </div>
      <div className="flex-1 w-full centerDiv overflow-y-scroll">
        <Content />
      </div>
      {signInUpModal && <SignInUpModal />}
    </div>
  );
};
