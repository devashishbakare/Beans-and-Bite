import React from "react";
import { useUpdateSelection } from "./ContentContext";
export const Content = () => {
  const { selectedOption, updateSelection } = useUpdateSelection();
  return (
    <div className="h-full w-full addBorder">
      {selectedOption == "home" && <div className="">homePage Render</div>}
      {selectedOption == "mobileSearch" && (
        <div className="">mobile search component</div>
      )}
    </div>
  );
};
