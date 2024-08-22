import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiShoppingCart, CiHeart, CiSearch } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
export const Navbar = () => {
  const [searchIconClick, setSearchIconClick] = useState(false);
  return (
    <div className="h-full w-full max-w-[1050px] flex">
      <div className="h-full w-[80px] ml-3 centerDiv">
        <div className="h-[45px] w-[45px] rounded-[50%]">
          <img
            src="http://res.cloudinary.com/djgouef8q/image/upload/v1724295399/hkijeoyi8l90co1j2yeu.png"
            alt="logo"
            className="h-full w-full bg-cover"
          />
        </div>
      </div>
      <div className="h-full flex-1 flex gap-2 ml-2">
        {searchIconClick === false ? (
          <>
            <div className="h-full min-w-[70px] centerDiv">Home</div>
            <div className="h-full min-w-[70px] centerDiv">Gift</div>
            <div className="h-full min-w-[70px] centerDiv">Order</div>
          </>
        ) : (
          <div className="h-full w-[95%] centerDiv">
            <div className="h-[70%] ml-[10%] w-full border-[1.2px] border-gray-400 rounded-[30px] flex items-center bg-[#f9f9f8] flex">
              <span
                onClick={() => setSearchIconClick(false)}
                className="h-full w-[50px] centerDiv"
              >
                <IoIosArrowRoundBack className="text-[1.8rem]" />
              </span>
              <input
                className="h-[85%] w-[75%] ml-[5%] border-none outline-none bg-[#f9f9f8]"
                type="text"
                // value={searchKey}
                // onChange={handleInput}
                placeholder="Looking for something specific?"
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={`h-full  ${
          searchIconClick ? "w-[220px]" : "w-[280px]"
        } flex flex-row-reverse gap-1`}
      >
        <div className="h-full w-[60px] centerDiv">
          <HiOutlineUserCircle className="text-[2.1rem]" />
        </div>
        <div className="h-full w-[60px] centerDiv">
          <CiShoppingCart className="text-[1.8rem]" />
        </div>
        <div className="h-full w-[60px] centerDiv">
          <CiHeart className="text-[1.8rem]" />
        </div>
        {searchIconClick == false && (
          <div className="h-full w-[60px] centerDiv">
            <CiSearch
              onClick={() => setSearchIconClick(true)}
              className="text-[1.8rem]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
