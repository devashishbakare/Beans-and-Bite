import React, { useState } from "react";
import { History } from "./History";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFromNavbar, removeFromHistory } from "../redux/slices/historySlice";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
import { giftCartInfo } from "../utils/DisplayData";
import { GiftCard } from "./GiftCard";
export const Gift = () => {
  //const cardInfo = giftCartInfo[0][2];
  const dispatch = useDispatch();
  const [optionSelectionIndex, setOptionSelectionIndex] = useState(1);
  useEffect(() => {
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Gift" }));
    };
    updateHistory();
  }, []);

  const handleOrderMerchendise = () => {
    dispatch(removeFromHistory({ index: 1, sectionName: "Gift" }));
    dispatch(
      updateNavbarOptionSelection({
        option: "Order",
        extraData: { currSelectedOption: "Merchandise" },
      })
    );
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[70px] w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px]">
          <History />
        </div>
      </div>
      <div className="h-[230px] w-full centerDiv theamColor shrink-0">
        <div className="h-full w-full max-w-[1050px] flex flex-col items-center">
          <div className="h-[200px] w-[95%] flex items-center p-2 bg-[#13603c] rounded-md">
            <img
              src="http://res.cloudinary.com/djgouef8q/image/upload/v1728098075/vgqwnvpsrdxdbipy0n7s.png"
              alt="advertisedImage"
              className="h-full w-[95px]"
            />
            <div className="flex-1 shrink-0 flex flex-col p-1 pl-[5px] gap-2 md:gap-3 md:pl-[15px] lg:gap-4">
              <span className="text-[#f4f4f4] text-[0.85rem] opacity-85 addFont">
                beans and bite
              </span>
              <span className="text-[#f4f4f4] text-[1rem] addFont">
                Essential Collection
              </span>
              <span className="text-[#f4f4f4] text-[0.85rem] opacity-85 capitalize">
                a whole new expression of classic beans and bite design. explore
                merchandise collection
              </span>
              <span className="h-[40px] w-full flex md:pl-[0px]">
                <span className="hide sm:flex h-full w-[50%] flex-col sm:flex-row">
                  <span className="h-[50%] w-full text-[#f4f4f4] text-[0.85rem] opacity-85 capitalize md:h-full md:w-[100px]">
                    starting from
                  </span>

                  <span className="h-[50%] w-full text-[#f4f4f4] text-[0.85rem] opacity-85 capitalize md:h-full md:w-[100px]">
                    ₹ 500
                  </span>
                </span>
                <span className="h-full w-full flex sm:w-[50%] sm:flex-row-reverse pr-[8%]">
                  <button
                    onClick={() => handleOrderMerchendise()}
                    className="h-[35px] w-[100px] text-[#f4f4f4] text-[0.85rem] theamColor centerDiv rounded-3xl capitalize"
                  >
                    Order now
                  </button>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[70px] w-full centerDiv bg-[#edebe9] shrink-0">
        <div className="h-full w-full max-w-[1050px] flex gap-[5px] overflow-x-scroll md:gap-[10px]">
          <span className="h-full w-[130px] flex flex-col items-center">
            <span
              onClick={() => setOptionSelectionIndex(1)}
              className="flex-1 w-full addFont uppercase centerDiv text-[0.93rem] cursor-pointer"
              data-testid="anytimeSection"
            >
              anytime
            </span>
            {optionSelectionIndex == 1 && (
              <span className="h-[1px] w-[95%] border-2 border-green-800"></span>
            )}
          </span>

          <span className="h-full w-[130px] flex flex-col items-center">
            <span
              onClick={() => setOptionSelectionIndex(2)}
              className="flex-1 w-full addFont uppercase centerDiv text-[0.93rem] cursor-pointer"
              data-testid="congratsSection"
            >
              congrats
            </span>
            {optionSelectionIndex == 2 && (
              <span className="h-[1px] w-[95%] border-2 border-green-800"></span>
            )}
          </span>
          <span className="h-full w-[130px] flex flex-col items-center">
            <span
              onClick={() => setOptionSelectionIndex(3)}
              className="flex-1 w-full addFont uppercase centerDiv text-[0.93rem] cursor-pointer"
              data-testid="thankYouSection"
            >
              thank you
            </span>
            {optionSelectionIndex == 3 && (
              <span className="h-[1px] w-[95%] border-2 border-green-800"></span>
            )}
          </span>
        </div>
      </div>
      <div className="flex-1 w-full centerDiv">
        <div className="h-full w-full max-w-[1050px]">
          {optionSelectionIndex == 1 && (
            <div className="h-full w-full flex flex-wrap p-2 items-center justify-center md:items-start md:justify-start">
              {giftCartInfo[0].map((cardInfo) => (
                <GiftCard cardInfo={cardInfo} key={cardInfo.id} />
              ))}
            </div>
          )}
          {optionSelectionIndex == 2 && (
            <div className="h-full w-full flex flex-wrap p-2 items-center justify-center md:items-start md:justify-start">
              {giftCartInfo[1].map((cardInfo) => (
                <GiftCard cardInfo={cardInfo} key={cardInfo.id} />
              ))}
            </div>
          )}
          {optionSelectionIndex == 3 && (
            <div className="h-full w-full flex flex-wrap p-2 items-center justify-center md:items-start md:justify-start">
              {giftCartInfo[2].map((cardInfo) => (
                <GiftCard cardInfo={cardInfo} key={cardInfo.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
