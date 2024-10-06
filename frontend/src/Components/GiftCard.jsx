import React from "react";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
import { useDispatch } from "react-redux";
export const GiftCard = ({ cardInfo }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(
          updateNavbarOptionSelection({
            option: "giftView",
            extraData: cardInfo,
          })
        )
      }
      className="h-[180px] w-[300px] flex flex-row-reverse mt-[10px] md:ml-[20px]"
    >
      <div className="h-full w-[80%] flex flex-row-reverse addShadow relative rounded-md bg-[#edebe9]">
        <div className="absolute h-[80px] w-[110px] top-[13%] right-[80%]">
          <img
            src={cardInfo.image}
            alt="cartImage"
            className="h-full w-full bg-cover"
          />
        </div>
        <div className="h-full w-[80%] flex flex-col pl-[10px] justify-center">
          <span className="h-auto w-full addFont flex items-center capitalize font-bold text-[0.95rem] pl-1">
            {cardInfo.title}
          </span>
          <span className="h-[80px] w-full overflow-hidden text-[0.8rem] p-1 capitalize">
            {cardInfo.desc}
          </span>
          <button className="h-[35px] w-[100px] bg-[#16754a] text-[#f4f4f4] text-[0.85rem] centerDiv rounded-3xl capitalize">
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};
