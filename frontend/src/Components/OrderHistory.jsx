import React from "react";
import { History } from "./History";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFromNavbar } from "../redux/slices/historySlice";
import { fetchUserOrderHistory } from "../utils/api";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
export const OrderHistory = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [storeHistory, setStoreHistory] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 5,
    totalOrderCount: 0,
  });

  const getOrderHistory = async (token, page, limit) => {
    setIsLoading(true);
    const response = await fetchUserOrderHistory(token, page, limit);
    console.log(response, "from component");
    if (response.success) {
      const { orders, totalOrder } = response.data;
      setPaginationDetails((prevDetails) => ({
        ...prevDetails,
        page: page,
        totalOrderCount: totalOrder,
      }));
      setOrderHistory(orders);
      setStoreHistory(orders);
    } else {
      showErrorNotification("something went wrong, please try again later");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Order History" }));
    };
    updateHistory();
    getOrderHistory(token, 1, 5);
  }, [token]);
  return (
    <div className="h-full w-full flex flex-col centerDiv">
      <div className="h-[70px] w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px]">
          <History />
        </div>
      </div>
      {isLoading ? (
        <div className="h-full w-full bg-black bg-opacity-15 centerDiv p-2 rounded-md">
          <div className="h-[150px] w-[250px] bg-white flex flex-col items-center p-2 addShadow rounded-md">
            <span className="h-[50%] w-full text-center addFont">
              we are processing your request please wait
            </span>
            <span className="h-[50%] w-full centerDiv">
              <CircularSpinner />
            </span>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col centerDiv overflow-y-scroll">
          here is your all content
        </div>
      )}
    </div>
  );
};
