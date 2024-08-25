import React from "react";
import { useState } from "react";
import {
  IoChevronDown,
  IoChevronUp,
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
} from "react-icons/io5";
export const Contact = () => {
  const [showHideContactDetails, setShowHideContactDetails] = useState(
    new Array(3).fill(false)
  );
  const handleShowContactDetails = (index) => {
    const updateDetails = [...showHideContactDetails];
    updateDetails[index] = !updateDetails[index];
    setShowHideContactDetails(updateDetails);
  };
  return (
    <div className="h-auto w-full centerDiv theamColor mt-[30px] p-2">
      <div className="h-auto w-full max-w-[1050px] flex flex-col mt-[50px] mb-[50px]">
        <div className="h-auto w-full flex flex-col  md:flex-row">
          <div className="h-[80px] w-full flex items-center pl-3 md:w-[100px]">
            <div className="h-[45px] w-[45px] rounded-[50%]">
              <img
                src="http://res.cloudinary.com/djgouef8q/image/upload/v1724295399/hkijeoyi8l90co1j2yeu.png"
                alt="logo"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="h-auto w-full flex flex-col md:hidden">
            <div className="h-[auto] w-full flex flex-col items-center pl-3 text-[#f4f4f4]">
              <div
                onClick={() => handleShowContactDetails(0)}
                className="h-[auto] w-full flex items-center"
              >
                <span className="h-[80px] w-[80%] flex items-center addFont text-[0.94rem]">
                  About Us
                </span>
                <span className="h-[80px] w-[20%] centerDiv">
                  {showHideContactDetails[0] ? (
                    <IoChevronUp className="text-[1.5rem]" />
                  ) : (
                    <IoChevronDown className="text-[1.5rem]" />
                  )}
                </span>
              </div>
              {showHideContactDetails[0] == true && (
                <div className="h-auto w-full flex flex-col">
                  <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                    Our Heritage
                  </span>
                  <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                    Coffeehouse
                  </span>
                  <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                    Our Company
                  </span>
                </div>
              )}
            </div>
            <div className="h-[auto] w-full flex flex-col items-center pl-3 text-[#f4f4f4]">
              <div
                onClick={() => handleShowContactDetails(1)}
                className="h-[auto] w-full flex items-center"
              >
                <span className="h-[80px] w-[80%] flex items-center addFont text-[0.94rem]">
                  Responsibility
                </span>
                <span className="h-[80px] w-[20%] centerDiv">
                  {showHideContactDetails[1] ? (
                    <IoChevronUp className="text-[1.5rem]" />
                  ) : (
                    <IoChevronDown className="text-[1.5rem]" />
                  )}
                </span>
              </div>
              {showHideContactDetails[1] == true && (
                <div className="h-auto w-full flex flex-col">
                  <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                    Diversity
                  </span>
                  <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                    Community
                  </span>
                  <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                    Ethical Sourcing
                  </span>
                </div>
              )}
            </div>
            <div className="h-[auto] w-full flex flex-col items-center pl-3 text-[#f4f4f4]">
              <div
                onClick={() => handleShowContactDetails(2)}
                className="h-[auto] w-full flex items-center"
              >
                <span className="h-[80px] w-[80%] flex items-center addFont text-[0.94rem]">
                  Quick Links
                </span>
                <span className="h-[80px] w-[20%] centerDiv">
                  {showHideContactDetails[2] ? (
                    <IoChevronUp className="text-[1.5rem]" />
                  ) : (
                    <IoChevronDown className="text-[1.5rem]" />
                  )}
                </span>
              </div>
              {showHideContactDetails[2] == true && (
                <div className="h-auto w-full flex flex-col">
                  <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                    Privacy Policy
                  </span>
                  <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                    FAQs
                  </span>
                  <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                    Customer Service
                  </span>
                </div>
              )}
            </div>
            <div className="h-[100px] w-full flex mt-[20px] justify-between text-white ml-3">
              <div className="h-full w-[150px] flex flex-col">
                <span className="h-[50px] w-full addFont text-[1rem] mt-1">
                  Social Media
                </span>
                <span className="h-[50px] w-full flex gap-4">
                  {/* IoLogoInstagram, IoLogoFacebook, IoLogoTwitter, */}
                  <IoLogoInstagram className="text-[1.7rem]" />
                  <IoLogoFacebook className="text-[1.7rem]" />
                  <IoLogoTwitter className="text-[1.7rem]" />
                </span>
              </div>
              <div className="h-full w-[150px] flex flex-col gap-1 pr-4">
                <span className="h-[50px] w-full">
                  <img
                    src="http://res.cloudinary.com/djgouef8q/image/upload/v1724494601/gbddiyhs3qqmusj51bev.png"
                    alt="appStoreImage"
                    className=""
                  />
                </span>
                <span className="h-[50px] w-full">
                  <img
                    src="http://res.cloudinary.com/djgouef8q/image/upload/v1724494623/kkqzbnzu2q34c8rd91oq.png"
                    alt="appStoreImage"
                    className=""
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="hide md:flex flex-row h-auto w-full justify-around">
            <div className="h-auto w-[120px] text-white">
              <span className="h-[50px] w-[80%] flex items-center addFont text-[0.94rem]">
                About Us
              </span>
              <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                Our Heritage
              </span>
              <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                Coffeehouse
              </span>
              <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                Our Company
              </span>
            </div>
            <div className="h-auto w-[120px] text-white">
              <span className="h-[50px] w-[80%] flex items-center addFont text-[0.94rem]">
                Responsibility
              </span>
              <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                Diversity
              </span>
              <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                Community
              </span>
              <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                Ethical Sourcing
              </span>
            </div>
            <div className="h-auto w-[120px] text-white">
              <span className="h-[50px] w-[80%] flex items-center addFont text-[0.94rem]">
                Quick Links
              </span>
              <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                Privacy Policy
              </span>
              <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                FAQs
              </span>
              <span className="h-[50px] w-full text-[0.8rem] flex items-center">
                Customer Service
              </span>
            </div>
            <div className="h-auto w-[140px] flex flex-col">
              <div className="h-full w-[150px] flex flex-col text-white">
                <span className="h-[50px] w-full addFont text-[1rem] flex items-center">
                  Social Media
                </span>
                <span className="h-[50px] w-full flex gap-4">
                  {/* IoLogoInstagram, IoLogoFacebook, IoLogoTwitter, */}
                  <IoLogoInstagram className="text-[1.7rem]" />
                  <IoLogoFacebook className="text-[1.7rem]" />
                  <IoLogoTwitter className="text-[1.7rem]" />
                </span>
              </div>
              <div className="h-full w-[150px] flex flex-col gap-1 pr-4">
                <span className="h-[50px] w-full">
                  <img
                    src="http://res.cloudinary.com/djgouef8q/image/upload/v1724494601/gbddiyhs3qqmusj51bev.png"
                    alt="appStoreImage"
                    className=""
                  />
                </span>
                <span className="h-[50px] w-full">
                  <img
                    src="http://res.cloudinary.com/djgouef8q/image/upload/v1724494623/kkqzbnzu2q34c8rd91oq.png"
                    alt="appStoreImage"
                    className=""
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[1px] border-gray-500 ml-2 mr-2 mt-[20px]" />
        <div className="h-[200px] w-full mt-[10px] flex flex-col text-[#f4f4f4] gap-[30px] p-2 md:flex-row md:h-[40px] md:gap-4 md:mt-[30px]">
          <span className="w-[11%]"></span>
          <span className="pr-4 border-r-2 border-white text-[0.85rem] border-none">
            Web Accessibility
          </span>
          <span className="pr-4 border-r-2 border-white text-[0.85rem] border-none">
            Privacy Statement
          </span>
          <span className="pr-4 border-r-2 border-white text-[0.85rem] border-none">
            Terms Of Use
          </span>
          <span className="text-[0.85rem] border-none">Contact Us</span>
        </div>
      </div>
    </div>
  );
};
