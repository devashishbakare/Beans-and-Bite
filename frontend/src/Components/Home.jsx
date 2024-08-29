import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { MobileViewNavBar } from "./MobileViewNavBar";
import { Content } from "./Content";
import { SignInUpModal } from "./SignInUpModal";
export const Home = () => {
  const [showSignInUpModal, setShowSignInUpModal] = useState(false);

  const closeSignInUpModal = () => {
    setShowSignInUpModal(false);
  };
  const openSignInUpModal = () => {
    setShowSignInUpModal(true);
  };

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col-reverse relative sm:flex-col">
      <div className="hide sm:flex justify-center items-center h-[70px] w-full addBorder ">
        <Navbar openSignInUpModal={openSignInUpModal} />
      </div>
      <div className="h-[70px] w-full max-w-[1050px] centerDiv sm:hidden">
        <MobileViewNavBar openSignInUpModal={openSignInUpModal} />
      </div>
      <div className="flex-1 w-full centerDiv overflow-y-scroll">
        <Content />
      </div>
      {showSignInUpModal && (
        <SignInUpModal closeSignInUpModal={closeSignInUpModal} />
      )}
    </div>
  );
};
