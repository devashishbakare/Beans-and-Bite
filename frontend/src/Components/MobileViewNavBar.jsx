import React from "react";
import { CiHome, CiSearch, CiGift } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useUpdateSelection } from "./ContentContext";
export const MobileViewNavBar = () => {
  const { updateSelection } = useUpdateSelection();
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-[40%] flex">
        <div className="h-full w-[50%] centerDiv flex-col gap-1">
          <CiHome className="text-[1.7rem] text-green-800 " />
          <span className="text-[0.6rem]">Home</span>
        </div>
        <div className="h-full w-[50%] centerDiv flex-col gap-1">
          <CiGift className="text-[1.7rem] text-green-800 " />
          <span className="text-[0.6rem]">Gift</span>
        </div>
      </div>
      <div className="h-full w-[90px] flex flex-col-reverse relative">
        <div className="absolute h-[75px] w-[75px] top-[-60%] left-[8%] rounded-[50%] bg-green-900 centerDiv">
          <img
            src="http://res.cloudinary.com/djgouef8q/image/upload/v1724325833/tofrl4dxue5t80lgkwu4.png"
            alt="cup_image"
            className="h-[40px] w-[40px] bg-cover"
          />
        </div>
        {/* <div className="h-[60%] w-full"></div> */}
        <span className="w-full h-[30%] text-[0.7rem] centerDiv mb-2">
          Order
        </span>
      </div>
      <div className="h-full w-[40%] flex">
        <div
          onClick={() => updateSelection("mobileSearch")}
          className="h-full w-[50%] centerDiv flex-col gap-1"
        >
          <CiSearch className="text-[1.7rem] text-green-800 " />
          <span className="text-[0.6rem]">Search</span>
        </div>
        <div className="h-full w-[50%] centerDiv flex-col gap-1">
          <HiOutlineUserCircle className="text-[1.7rem] text-green-800 " />
          <span className="text-[0.6rem]">Profile</span>
        </div>
      </div>
    </div>
  );
};
