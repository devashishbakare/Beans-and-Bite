import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToHistory } from "../redux/slices/historySlice";
import { History } from "./History";
export const ProductOrder = ({ product }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addToHistory({ sectionName: "duhh" }));
  }, [dispatch]);
  return (
    <div className="h-full w-full addBorder flex flex-col gap-2">
      <div className="h-[70px] w-full centerDiv theamColor">
        <History />
      </div>
      {/* <div className="flex-1 addBorder"></div> */}
    </div>
  );
};
