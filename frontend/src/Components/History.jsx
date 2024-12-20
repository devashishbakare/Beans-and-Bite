import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
import { removeFromHistory } from "../redux/slices/historySlice";
export const History = () => {
  const { history } = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const handleHistoryChange = (index, sectionName) => {
    if (index == history.length - 1) {
      return;
    }
    if (
      sectionName == "Order" ||
      sectionName == "Gift" ||
      sectionName == "Home" ||
      sectionName == "Wallet" ||
      sectionName == "Cart" ||
      sectionName == "Article"
    ) {
      dispatch(updateNavbarOptionSelection({ option: sectionName }));
    } else {
      dispatch(
        updateNavbarOptionSelection({
          option: "Order",
          extraData: { currSelectedOption: sectionName },
        })
      );
      dispatch(removeFromHistory({ index, sectionName }));
    }
  };

  return (
    <div className="h-full w-full max-w-[1050px] pl-3 flex text-white overflow-x-scroll no-scrollbar">
      {history.map((sectionName, index) => (
        <div
          key={sectionName + "index"}
          className="h-full w-auto flex items-center"
        >
          <div className="h-full pl-[10px] pr-[10px] centerDiv truncate">
            <span
              onClick={() => handleHistoryChange(index, sectionName)}
              className="text-[1.1rem] opacity-70 cursor-pointer"
            >
              {sectionName}
            </span>
          </div>
          {index != history.length - 1 && <span className="">&gt;</span>}
        </div>
      ))}
    </div>
  );
};
