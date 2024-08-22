import React from "react";
import { Navbar } from "./Navbar";
import { MobileViewNavBar } from "./MobileViewNavBar";
import { Content } from "./Content";
export const Home = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col-reverse sm:flex-col">
      <div className="hide sm:flex justify-center items-center h-[70px] w-full addBorder ">
        <Navbar />
      </div>
      <div className="h-[70px] w-full max-w-[1050px] centerDiv sm:hidden">
        <MobileViewNavBar />
      </div>
      <div className="flex-1 w-full addBorder centerDiv">
        <Content />
      </div>
    </div>
  );
};
