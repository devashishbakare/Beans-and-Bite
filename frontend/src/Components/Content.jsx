import React from "react";
import { useUpdateSelection } from "./ContentContext";
import { MobileSearch } from "./MobileSearch";
import { Display } from "./Display";
export const Content = () => {
  const { selectedOption, updateSelection } = useUpdateSelection();
  return (
    <div className="h-full w-full">
      {selectedOption == "home" && (
        <div className="h-full w-full">
          <Display />
        </div>
      )}
      {selectedOption == "mobileSearch" && (
        <div className="h-full w-full">
          <MobileSearch />
        </div>
      )}
    </div>
  );
};
