import React, { useState } from "react";
import { History } from "./History";
import { fetchUserGiftHistory } from "../utils/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFromNavbar } from "../redux/slices/historySlice";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { MdOutlineSort } from "react-icons/md";
import { showErrorNotification } from "../utils/notification";
export const GiftHistory = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userAuth);
  const [userGiftHistory, setUserGiftHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 5,
    totalGiftCount: 0,
  });
  const [showFilterOption, setShowFilterOption] = useState(false);
  const [storeBeforeFilter, setStoreBeforeFilter] = useState([]);

  const getHistory = async (token, page, limit) => {
    setIsLoading(true);
    const response = await fetchUserGiftHistory(token, page, limit);
    console.log(response, "from component");
    if (response.success) {
      console.log(response.data);
      const { giftDetails, totalGifts } = response.data;
      setPaginationDetails((prevDetails) => ({
        ...prevDetails,
        page: page,
        totalGiftCount: totalGifts,
      }));
      setUserGiftHistory(giftDetails);
      setStoreBeforeFilter(giftDetails);
    } else {
      showErrorNotification("something went wrong, please try again later");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Gift History" }));
    };
    updateHistory();
    getHistory(token, 1, 5);
  }, [token]);

  const handleChangePagination = async (page) => {
    await getHistory(token, page, 5);
  };

  const sortByStatus = (requestFor) => {
    setIsLoading(true);

    if (requestFor == "sent") {
      const filteredData = storeBeforeFilter.filter(
        (gift) => gift.status == "sent"
      );
      setUserGiftHistory(filteredData);
    } else {
      const filteredData = storeBeforeFilter.filter(
        (gift) => gift.status != "sent"
      );
      setUserGiftHistory(filteredData);
    }
    setShowFilterOption(false);
    setIsLoading(false);
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
            {storeBeforeFilter && storeBeforeFilter.length == 0 ? (
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
              <div className="flex-1 w-full flex flex-col overflow-y-scroll gap-2 items-center md:items-start md:pl-[10px]">
                <div className="h-auto w-full flex flex-row-reverse pr-[10px] mt-[10px] flex-0">
                  <span
                    onClick={() => setShowFilterOption(!showFilterOption)}
                    className="h-[45px] w-[180px] centerDiv capitalize addFont border-[1px] border-gray-300 rounded-md gap-2 relative overflow-visible cursor-pointer"
                  >
                    <MdOutlineSort className="text-[1.4rem]" />
                    Filter your gifts
                    {storeBeforeFilter &&
                      storeBeforeFilter.length > 0 &&
                      showFilterOption && (
                        <div className="absolute top-[110%] right-0 w-full z-[8999] bg-[#f4f4f4] flex flex-col gap-2 p-2 addShadow rounded-md">
                          <span
                            onClick={() => sortByStatus("received")}
                            className="h-auto w-[180px] capitalize addFont p-1 cursor-pointer"
                          >
                            gift received
                          </span>
                          <hr className="w-full bg-slate-300" />
                          <span
                            onClick={() => sortByStatus("sent")}
                            className="h-auto w-[180px] capitalize addFont p-1 cursor-pointer"
                          >
                            gift sent
                          </span>
                        </div>
                      )}
                  </span>
                </div>
                <div className="flex-1 w-full flex flex-col gap-2 items-center md:pl-[10px] md:items-start">
                  {userGiftHistory && userGiftHistory.length == 0 ? (
                    <div className="h-full w-full flex flex-col items-center">
                      <img
                        src="http://res.cloudinary.com/djgouef8q/image/upload/v1728017775/vqesytc0j5avasvpyxxl.png"
                        alt="emptyImage"
                        className="h-[250px] w-[250px] bg-cover rounded-[50%]"
                      />
                      <span className="addFont opacity-50 capitalize">
                        No Gifts in this selection
                      </span>
                    </div>
                  ) : (
                    <>
                      {userGiftHistory &&
                        userGiftHistory.map((gift) => (
                          <div
                            key={"giftHistory" + gift.giftCardDetails._id}
                            className="h-auto w-[90%] flex flex-col p-2 rounded-md addShadow gap-2 shrink-0"
                          >
                            <div className="h-[50px] w-full flex items-center addFont theamColor pl-[10px] text-white rounded-md">
                              {gift.giftCardDetails.name}
                            </div>
                            <div className="h-auto w-full flex flex-col items-center md:flex-row">
                              <div className="h-[160px] w-full md:w-[400px]">
                                <img
                                  src={gift.giftCardDetails.giftCardImage}
                                  alt="giftCardImage"
                                  className="h-full w-full bg-cover"
                                />
                              </div>
                              <div className="h-auto w-full flex flex-col md:ml-[20px]">
                                {gift.status == "sent" ? (
                                  <>
                                    <div className="h-auto w-full flex items-center gap-2 mt-[5px]">
                                      <span className="addFont pt-[5px] pb-[5px] ml-[5px]">
                                        Recipient Name
                                      </span>
                                      :
                                      <span className="capitalize">
                                        {gift.giftCardDetails.recipientName}
                                      </span>
                                    </div>
                                    <div className="h-auto w-full flex items-center gap-2">
                                      <span className="addFont pt-[5px] pb-[5px] ml-[5px]">
                                        Recipient No
                                      </span>
                                      :
                                      <span className="capitalize">
                                        {
                                          gift.giftCardDetails
                                            .recipientMobileNumber
                                        }
                                      </span>
                                    </div>
                                    <div className="h-auto w-full flex items-center gap-2">
                                      <span className="addFont pt-[5px] pb-[5px] ml-[5px]">
                                        Amount
                                      </span>
                                      :
                                      <span className="capitalize">
                                        {gift.giftCardDetails.amount}
                                      </span>
                                    </div>
                                    <div className="h-auto w-full flex items-center gap-2">
                                      <span className="addFont pt-[5px] pb-[5px] ml-[5px]">
                                        Status
                                      </span>
                                      :<span className="capitalize">sent</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="h-auto w-full flex items-center gap-2 mt-[5px]">
                                      <span className="addFont pt-[5px] pb-[5px] ml-[5px]">
                                        Sender Name
                                      </span>
                                      :
                                      <span className="capitalize">
                                        {gift.giftCardDetails.senderName}
                                      </span>
                                    </div>
                                    <div className="h-auto w-full flex items-center gap-2">
                                      <span className="addFont pt-[5px] pb-[5px] ml-[5px]">
                                        Sender No
                                      </span>
                                      :
                                      <span className="capitalize">
                                        {
                                          gift.giftCardDetails
                                            .senderMobileNumber
                                        }
                                      </span>
                                    </div>
                                    <div className="h-auto w-full flex items-center gap-2">
                                      <span className="addFont pt-[5px] pb-[5px] ml-[5px]">
                                        Amount
                                      </span>
                                      :
                                      <span className="capitalize">
                                        {gift.giftCardDetails.amount}
                                      </span>
                                    </div>
                                    <div className="h-auto w-full flex items-center gap-2">
                                      <span className="addFont pt-[5px] pb-[5px] ml-[5px]">
                                        Status
                                      </span>
                                      :
                                      <span className="capitalize">
                                        Received
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* todo : show only when there is pagination possible */}
            {userGiftHistory &&
              userGiftHistory.length > 0 &&
              paginationDetails.totalGiftCount > 5 && (
                <div className="h-[70px] w-full flex justify-between pl-[10px] pr-[10px] items-center">
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
                  {paginationDetails.totalGiftCount >
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
          </div>
        </div>
      )}
    </div>
  );
};
