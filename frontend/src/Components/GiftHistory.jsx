import React, { useState } from "react";
import { History } from "./History";
import { fetchUserGiftHistory } from "../utils/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFromNavbar } from "../redux/slices/historySlice";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { showErrorNotification } from "../utils/notification";
export const GiftHistory = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userAuth);
  const [userGiftHistory, setUserGiftHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Gift History" }));
    };
    const getHistory = async (token) => {
      setIsLoading(true);
      const response = await fetchUserGiftHistory(token);
      console.log(response, "from component");
      if (response.success) {
        setUserGiftHistory(response.data);
      } else {
        showErrorNotification("something went wrong, please try again later");
      }
      setIsLoading(false);
    };
    updateHistory();
    getHistory(token);
  }, [token]);

  return (
    <div className="h-full w-full flex flex-col centerDiv">
      <div className="h-[70px] w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px]">
          <History />
        </div>
      </div>
      {isLoading ? (
        <div className="h-full w-full bg-white centerDiv p-2 rounded-md">
          <span className="h-[50%] w-full text-center addFont capitalize">
            we are Fetching Details, please wait
          </span>
          <span className="h-[50%] w-full centerDiv">
            <CircularSpinner />
          </span>
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col centerDiv overflow-y-scroll">
          <div className="h-full w-full flex flex-col max-w-[1050px] addBorder"></div>
        </div>
      )}
    </div>
  );
};
