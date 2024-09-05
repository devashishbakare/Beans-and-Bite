import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkAndFetchProduct } from "../redux/Thunk/Product";
import { showErrorNotification } from "../utils/notification";
import { ToastContainer } from "react-toastify";
export const Order = () => {
  const [currSelectedOption, setCurrentSelectedOption] = useState("bestseller");
  const dispatch = useDispatch();
  const { categories, error } = useSelector((state) => state.category);

  const handleCategoryChange = (categoryName) => {
    dispatch(checkAndFetchProduct(categoryName));
    setCurrentSelectedOption(categoryName);
    if (error || categories[categoryName].length == 0) {
      showErrorNotification("something went wrong try again later");
    }
  };

  useEffect(() => {
    const fetchBestSellingProduct = (categoryName) => {
      handleCategoryChange(categoryName);
    };
    fetchBestSellingProduct("Bestseller");
  }, []);

  return (
    <>
      <div className="h-full w-full addBorder centerDiv">
        <div className="h-full w-full flex flex-col">
          <div className="h-full w-full bg-[#edebe9] flex flex-col centerDiv">
            <div className="h-[70px] w-full flex overflow-x-scroll gap-3 no-scrollbar items-center flex-shrink-0 max-w-[1050px]">
              <div className="h-full w-[120px] centerDiv flex flex-col flex-shrink-0">
                <span
                  onClick={() => handleCategoryChange("Bestseller")}
                  className={`h-[80%] w-[90%] centerDiv text-[0.92rem] ${
                    currSelectedOption == "bestseller" && `baseColor addFont`
                  }`}
                >
                  Bestseller
                </span>
                <span
                  className={`${
                    currSelectedOption == "bestseller" &&
                    `w-[90%] border-[1px] border-b-green-800`
                  }`}
                ></span>
              </div>
              <span className="h-[40px] border-[1px] border-gray-400"></span>
              <div className="h-full w-[120px] centerDiv flex flex-col flex-shrink-0">
                <span
                  onClick={() => handleCategoryChange("drinks")}
                  className={`h-[80%] w-[90%] centerDiv text-[0.92rem] ${
                    currSelectedOption == "drinks" && `baseColor addFont`
                  }`}
                >
                  Drinks
                </span>
                <span
                  className={`${
                    currSelectedOption == "drinks" &&
                    `w-[90%] border-[1px] border-b-green-800`
                  }`}
                ></span>
              </div>
              <span className="h-[40px] border-[1px] border-gray-400"></span>
              <div className="h-full w-[120px] centerDiv flex flex-col flex-shrink-0">
                <span
                  onClick={() => handleCategoryChange("Food")}
                  className={`h-[80%] w-[90%] centerDiv text-[0.92rem] ${
                    currSelectedOption == "food" && `baseColor addFont`
                  }`}
                >
                  Food
                </span>
                <span
                  className={`${
                    currSelectedOption == "food" &&
                    `w-[90%] border-[1px] border-b-green-800`
                  }`}
                ></span>
              </div>
              <span className="h-[40px] border-[1px] border-gray-400"></span>
              <div className="h-full w-[120px] centerDiv flex flex-col flex-shrink-0">
                <span
                  onClick={() => handleCategoryChange("Merchandise")}
                  className={`h-[80%] w-[90%] centerDiv text-[0.92rem] ${
                    currSelectedOption == "merchandise" && `baseColor addFont`
                  }`}
                >
                  Merchandise
                </span>
                <span
                  className={`${
                    currSelectedOption == "merchandise" &&
                    `w-[90%] border-[1px] border-b-green-800`
                  }`}
                ></span>
              </div>
              <span className="h-[40px] border-[1px] border-gray-400"></span>
              <div className="h-full w-[150px] centerDiv flex flex-col flex-shrink-0">
                <span
                  onClick={() => handleCategoryChange("Coffee At Home")}
                  className={`h-[80%] w-[90%] centerDiv text-[0.92rem] ${
                    currSelectedOption == "coffeeAtHome" && `baseColor addFont`
                  }`}
                >
                  Coffee At Home
                </span>
                <span
                  className={`${
                    currSelectedOption == "coffeeAtHome" &&
                    `w-[90%] border-[1px] border-b-green-800`
                  }`}
                ></span>
              </div>
              <span className="h-[40px] border-[1px] border-gray-400"></span>
              <div className="h-full w-[130px] centerDiv flex flex-col flex-shrink-0">
                <span
                  onClick={() => handleCategoryChange("Ready To Eat")}
                  className={`h-[80%] w-[90%] centerDiv text-[0.92rem] ${
                    currSelectedOption == "readyToEat" && `baseColor addFont`
                  }`}
                >
                  Ready to Eat
                </span>
                <span
                  className={`${
                    currSelectedOption == "readyToEat" &&
                    `w-[90%] border-[1px] border-b-green-800`
                  }`}
                ></span>
              </div>
            </div>
            <div className="flex-1 w-full centerDiv addBorder">
              {currSelectedOption == "Bestseller" &&
                categories["Bestseller"]?.map((product) => (
                  <div className="h-[100px] w-[100px] addBorder flex flex-col">
                    {product.name}
                  </div>
                ))}
              {currSelectedOption == "Drinks" &&
                categories["Drinks"]?.map((product) => (
                  <div className="h-[100px] w-[100px] addBorder flex flex-col">
                    {product.name}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};
