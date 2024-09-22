import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { MobileViewNavBar } from "./MobileViewNavBar";
import { Content } from "./Content";
import { SignInUpModal } from "./SignInUpModal";
import { updateSignInUpModal } from "../redux/slices/userAuthSlice";
import { useSelector } from "react-redux";
export const Home = () => {
  const { signInUpModal } = useSelector((state) => state.userAuth);

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col-reverse relative sm:flex-col">
      <div className="hide sm:flex justify-center items-center h-[70px] w-full addBorder ">
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
