import React from "react";
import { Navbar } from "./Navbar";
import { MobileViewNavBar } from "./MobileViewNavBar";
export const Home = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col-reverse sm:flex-col">
      <div className="hidden sm:flex h-[70px] w-full justify-center items-center addBorder">
        <Navbar />
      </div>
      <div className="h-[8vh] w-full max-w-[1050px] centerDiv sm:hidden">
        <MobileViewNavBar />
      </div>
      <div className="flex-1 w-full addBorder centerDiv">other content</div>
    </div>
  );
};
