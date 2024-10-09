import React, { useEffect, useState } from "react";
import { History } from "./History";
import { useDispatch } from "react-redux";
import { addFromNavbar, addToHistory } from "../redux/slices/historySlice";
import { GiOpenGate } from "react-icons/gi";
import { takeAwayStores, storeMapper } from "../utils/DisplayData";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
//todo : fetch card product details from db with useEffect and show here
//todo : customization can be handle with setting up customization details to store same as cart
export const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const [isStoreSelected, setIsStoreSelected] = useState(false);
  const [showStoreSelectionModal, setShowStoreSelectionModal] = useState(false);
  const store = takeAwayStores[1][0];
  const [citySelection, setCitySelection] = useState("");
  const [showCityOption, setShowCityOption] = useState(false);
  const [cityStoreSelectionId, setCityStoreSelectionId] = useState(-1);
  //console.log(store);
  useEffect(() => {
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Cart" }));
      dispatch(addToHistory({ sectionName: "Confirm Order" }));
    };
    updateHistory();
  }, []);

  const handleOutSideBoxCloseModal = (event) => {
    if (event.target.id == "storeOptionModal") {
      setShowStoreSelectionModal(false);
    }
  };

  const handleCitySelection = (cityName) => {
    console.log(cityName, "reached in updating city");
    setCitySelection(cityName);
    setShowCityOption(false);
  };

  const handleCityStoreSelection = (cityId) => {
    setCityStoreSelectionId(cityId);
    setShowStoreSelectionModal(false);
  };

  const handleStoreChange = () => {
    setCityStoreSelectionId(-1);
    setCitySelection("");
  };

  return (
    <div className="h-full w-full flex flex-col relative">
      <div className="h-[70px] w-full centerDiv theamColor">
        <div className="h-[70px] w-full centerDiv  max-w-[1050px]">
          <History />
        </div>
      </div>
      {showStoreSelectionModal == true && (
        <div
          id="storeOptionModal"
          onClick={(e) => handleOutSideBoxCloseModal(e)}
          className="absolute centerToPage z-[8890] h-full w-full bg-black bg-opacity-15 centerDiv"
        >
          <div className="h-[500px] w-[300px] flex flex-col bg-[#f4f4f4] addShadow rounded-md items-center md:w-[450px]">
            <div className="h-[70px] w-[95%] flex flex-col addShadow rounded-md mt-[10px] overflow-visible">
              <div
                onClick={() => setShowCityOption(!showCityOption)}
                className="h-[60px] w-[95%] flex justify-between items-center shrink-0"
              >
                <span className="pl-[20px] capitalize addFont">
                  select city
                </span>
                {showCityOption ? <FaCaretUp /> : <FaCaretDown />}
              </div>

              {showCityOption && (
                <div className="h-auto w-[95%] flex flex-col bg-white z-[9999]">
                  {takeAwayStores.map((cityData, index) => (
                    <span
                      key={`cityName-${index}`}
                      onClick={() => handleCitySelection(cityData[0].cityName)}
                      className={`h-[50px] w-full pl-[20px] flex items-center border-t-[1px] border-gray-400 ${
                        index == 0 && `border-none`
                      }`}
                    >
                      {cityData[0].cityName}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {citySelection.length == 0 && (
              <div className="flex-1 w-full centerDiv">
                <div className="addFont capitalize text-[0.95rem] opacity-60">
                  no city has been selected yet
                </div>
              </div>
            )}

            {citySelection && (
              <div className="h-auto w-full  mt-[10px]">
                {takeAwayStores.map((cityData) => (
                  <div className="h-auto w-full flex items-cente ">
                    {citySelection == cityData[0].cityName && (
                      <div className="h-auto w-full flex flex-col gap-[10px] items-center">
                        {cityData.map((city) => (
                          <div
                            key={city.cityName + "sub" + city.id}
                            className="h-[100px] w-[95%] flex addShadow rounded-md"
                          >
                            <div className="h-full w-[40px] flex">
                              <div className="h-[40px] w-full centerDiv mt-[5px]">
                                <input
                                  type="radio"
                                  name="city"
                                  className="h-[20px] w-[20px]"
                                  value={cityStoreSelectionId}
                                  checked={cityStoreSelectionId === city.id}
                                  onChange={() =>
                                    handleCityStoreSelection(city.id)
                                  }
                                />
                              </div>
                            </div>
                            <div className="h-full flex-1 flex flex-col p-1">
                              <span className="addFont mt-[5px]">
                                {city.cityName}
                              </span>
                              <span className="text-[0.9rem] mt-[5px] opacity-80">
                                {city.storeAddress}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="">{cityStoreSelectionId}</div>
          </div>
        </div>
      )}
      <div className="flex-1 w-full centerDiv">
        <div className="h-full w-full max-w-[1050px] flex flex-col">
          <div
            className={`h-[80px] w-full gap-[10px] shrink-0 mt-[10px] flex ${
              cityStoreSelectionId != -1 && `flex-col`
            } tems-center md:flex-row`}
          >
            <div className="h-full w-[220px] flex items-center gap-[10px] md:w-[250px]">
              <span className="uppercase pl-[10px] addFont text-[1.1rem]">
                Take-away from
              </span>
              <GiOpenGate className="text-[1.7rem] mb-[2px]" />
            </div>

            {citySelection.length == 0 || cityStoreSelectionId == -1 ? (
              <button
                onClick={() => setShowStoreSelectionModal(true)}
                className="underline text-blue-800 capitalize ml-[10px]"
              >
                select store
              </button>
            ) : (
              <div className="h-auto w-full p-2 flex flex-col addShadow rounded-md relative md:w-auto md:pr-[10px]">
                <span
                  onClick={() => handleStoreChange()}
                  className="absolute top-1 right-1 h-[30px] w-[30px] centerDiv"
                >
                  <IoIosCloseCircle className="text-[1.6rem]" />
                </span>

                <span className="h-[30px] w-full addFont mt-[5px]">
                  {storeMapper[cityStoreSelectionId - 1].cityName}
                </span>
                <span className="flex-1 w-full text-[0.9rem] mt-[5px] opacity-80">
                  {storeMapper[cityStoreSelectionId - 1].storeAddress}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
