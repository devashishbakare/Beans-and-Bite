import React from "react";
import { History } from "./History";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFromNavbar } from "../redux/slices/historySlice";
import { fetchUserOrderHistory } from "../utils/api";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { MdOutlineSort } from "react-icons/md";
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
  const [showFilterOption, setShowFilterOption] = useState(false);

  const getOrderHistory = async (token, page, limit) => {
    setIsLoading(true);
    const response = await fetchUserOrderHistory(token, page, limit);
    //console.log(response, "from component");
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

  const handleChangePagination = async (page) => {
    await getOrderHistory(token, page, 5);
  };

  const sortBy = (requestFor) => {
    if (requestFor == "date") {
      const updatedData = storeHistory.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setOrderHistory(updatedData);
    } else if (requestFor == "highAmount") {
      const updatedData = storeHistory.sort((a, b) => b.amount - a.amount);
      setOrderHistory(updatedData);
    } else {
      const updatedData = storeHistory.sort((a, b) => a.amount - b.amount);
      setOrderHistory(updatedData);
    }
    setShowFilterOption(false);
  };

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
          <div className="h-full w-full flex flex-col max-w-[1050px]">
            {storeHistory && storeHistory.length == 0 ? (
              <div className="flex-1 w-full centerDiv">
                <div className="h-full w-full centerDiv flex flex-col">
                  <img
                    src="http://res.cloudinary.com/djgouef8q/image/upload/v1728017775/vqesytc0j5avasvpyxxl.png"
                    alt="emptyImage"
                    className="h-[250px] w-[250px] bg-cover rounded-[50%]"
                  />
                  <span className="addFont opacity-50 capitalize">
                    You haven't sent or received any gifts yet.
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="h-auto w-full flex flex-row-reverse pr-[10px] mt-[10px] flex-0">
                  <span
                    onClick={() => setShowFilterOption(!showFilterOption)}
                    className="h-[45px] w-[180px] centerDiv capitalize addFont border-[1px] border-gray-300 rounded-md gap-2 relative overflow-visible cursor-pointer"
                  >
                    <MdOutlineSort className="text-[1.4rem]" />
                    sort your order
                    {showFilterOption && (
                      <div className="absolute top-[110%] right-0 w-full z-[8999] bg-[#f4f4f4] flex flex-col gap-2 p-2 addShadow rounded-md">
                        <span
                          onClick={() => sortBy("date")}
                          className="h-auto w-[180px] capitalize addFont p-1 cursor-pointer"
                        >
                          by date
                        </span>
                        <hr className="w-full bg-slate-300" />
                        <span
                          onClick={() => sortBy("highAmount")}
                          className="h-auto w-[180px] capitalize addFont p-1 cursor-pointer"
                        >
                          by highest amount
                        </span>
                        <hr className="w-full bg-slate-300" />
                        <span
                          onClick={() => sortBy("lowAmount")}
                          className="h-auto w-[180px] capitalize addFont p-1 cursor-pointer"
                        >
                          by lowest amount
                        </span>
                      </div>
                    )}
                  </span>
                </div>
                <div className="flex-1 w-full flex flex-col gap-2 items-center overflow-y-scroll shrink-0 md:pl-[10px] md:items-start">
                  {orderHistory.map((order) => (
                    <div className="h-auto w-[95%] flex flex-col items-center p-2 addShadow rounded-md shrink-0 md:w-[99%]">
                      <div className="h-[55px] w-full flex items-center theamColor rounded-md">
                        <div className="h-full flex-1 flex items-center gap-2">
                          <img
                            src="http://res.cloudinary.com/djgouef8q/image/upload/v1728289204/c6mavwy6p93u2vzp8lic.png"
                            alt="BeansAndBiteImage"
                            className="h-[45px] w-[45px] bg-cover ml-[10px]"
                          />
                          <span className="addFont text-[#f4f4f4]">
                            Order Summery
                          </span>
                        </div>
                        <span className="h-full w-[100px] text-white flex flex-row-reverse pr-[10px] items-center text-[0.9rem] underline cursor-pointer">
                          View Details
                        </span>
                      </div>
                      <div className="h-auto w-full flex flex-col gap-[10px] p-1 pl-[5px] mt-[10px]">
                        <span className="addFont pt-[5px] ml-[10px] md:hidden">
                          List Of Products
                        </span>
                        <span className="h-auto w-full flex flex-wrap gap-1 pl-[10px] md:hidden">
                          {order.products.map((product, index) => (
                            <span
                              key={"oh" + "ph" + index}
                              className="addFont text-[0.9rem] opacity-80"
                            >
                              <span className="">{product.productId.name}</span>

                              {index != order.products.length - 1 && (
                                <span className="">,</span>
                              )}
                            </span>
                          ))}
                        </span>
                        <div className="hide md:flex h-auto w-full items-center gap-1 pl-[10px]">
                          <span className="addFont text-[0.9rem]">
                            {" "}
                            List Of Products
                          </span>
                          :
                          <span className="addFont text-[0.9rem] opacity-80 flex items-center">
                            {order.products.map((product, index) => (
                              <span
                                key={"oh" + "ph" + index}
                                className="addFont text-[0.9rem] opacity-80"
                              >
                                <span className="">
                                  {product.productId.name}
                                </span>

                                {index != order.products.length - 1 && (
                                  <span className="">,</span>
                                )}
                              </span>
                            ))}
                          </span>
                        </div>
                        <div className="h-auto w-full flex items-center gap-1 pl-[10px]">
                          <span className="addFont text-[0.9rem]">
                            Payment Method
                          </span>
                          :
                          <span className="addFont text-[0.9rem] opacity-80">
                            {order.paymentMethod}
                          </span>
                        </div>
                        <div className="h-auto w-full flex items-center gap-1 pl-[10px]">
                          <span className="addFont text-[0.9rem]">Amount</span>:
                          <span className="addFont text-[0.9rem] opacity-80">
                            {order.amount} ₹
                          </span>
                        </div>
                        <div className="h-auto w-full flex items-center gap-1 pl-[10px]">
                          <span className="addFont text-[0.9rem]">Date</span>:
                          <span className="addFont text-[0.9rem] opacity-80">
                            {order.updatedAt.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {orderHistory &&
                  orderHistory.length > 0 &&
                  paginationDetails.totalOrderCount > 5 && (
                    <div className="h-[60px] w-full flex justify-between pl-[10px] pr-[10px] items-center">
                      {paginationDetails.page > 1 ? (
                        <button
                          onClick={() =>
                            handleChangePagination(paginationDetails.page - 1)
                          }
                          className=" h-[40px] w-[120px] capitalize text-[0.89rem] theamColor text-white rounded-md p-2 md:h-[40px]"
                        >
                          Previous
                        </button>
                      ) : (
                        <button className=""></button>
                      )}
                      {paginationDetails.totalOrderCount >
                      paginationDetails.page * paginationDetails.limit ? (
                        <button
                          onClick={() =>
                            handleChangePagination(paginationDetails.page + 1)
                          }
                          className=" h-[40px] w-[120px] capitalize text-[0.89rem] theamColor text-white rounded-md p-2 md:h-[40px]"
                        >
                          Next
                        </button>
                      ) : (
                        <button className=""></button>
                      )}
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
