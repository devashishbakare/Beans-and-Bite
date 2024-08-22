import React from "react";
import { createContext, useState, useContext } from "react";

const ContentSelectionContext = createContext();

export const ContentSelectionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("home");
  const updateSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <ContentSelectionContext.Provider
      value={{ selectedOption, updateSelection }}
    >
      {children}
    </ContentSelectionContext.Provider>
  );
};

export const useUpdateSelection = () => {
  return useContext(ContentSelectionContext);
};
