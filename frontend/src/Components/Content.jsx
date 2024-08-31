import React from "react";
import { useUpdateSelection } from "./ContentContext";
import { useSelector, useDispatch } from "react-redux";
import { MobileSearch } from "./MobileSearch";
import { Display } from "./Display";
export const Content = () => {
  //todo : update this with the redux slice
  // const { selectedOption, updateSelection } = useUpdateSelection();
  const { navbarOpationSelection } = useSelector(
    (state) => state.navbarSelection
  );
  return (
    <div className="h-full w-full">
      {navbarOpationSelection == "home" && (
        <div className="h-full w-full">
          <Display />
        </div>
      )}
      {navbarOpationSelection == "mobileSearch" && (
        <div className="h-full w-full">
          <MobileSearch />
        </div>
      )}
    </div>
  );
};
