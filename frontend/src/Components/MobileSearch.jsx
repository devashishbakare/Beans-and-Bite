import React, { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseCircleSharp } from "react-icons/io5";
import debounce from "lodash/debounce";
import { showErrorNotification } from "../utils/notification";
import { ToastContainer } from "react-toastify";
import { fetchSearchResult, fetchBestSellingProducts } from "../utils/api";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
//todo : addItem into user cart yet to implement
export const MobileSearch = () => {
  const [searchKey, setSearchKey] = useState("");
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchResultWithDebouncing = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery) {
        setLoading(true);
        const response = await fetchSearchResult(searchQuery);
        if (response.success == false) {
          showErrorNotification("something went wrong, please try again later");
        } else {
          //console.log(response.data);
          setNotFoundFlag(true);
          setSearchResult(response.data);
        }
        setLoading(false);
      } else {
        setSearchResult([]);
      }
    }, 700),
    []
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchKey(value);
    fetchResultWithDebouncing(value);
  };
  useEffect(() => {
    const fetchDisplayData = async () => {
      setLoading(true);
      const response = await fetchBestSellingProducts();
      if (response.success) {
        setBestSellingProducts(response.data);
      } else {
        showErrorNotification("Something went wrong while fetching data");
      }
      setLoading(false);
    };
    fetchDisplayData();
    return () => {
      fetchResultWithDebouncing.cancel();
    };
  }, [fetchResultWithDebouncing]);

  const cancelSearchOperation = () => {
    setSearchKey("");
    setNotFoundFlag(false);
  };

  return (
    <div className="h-full w-full flex flex-col gap-2 overflow-y-scroll bg-[#edebe9]">
      <div className="h-[100px] w-full theamColor centerDiv relative flex-shrink-0">
        <div className="h-[50px] w-[90%] bg-[#f4f4f4] flex rounded-[30px] centerDiv gap-2">
          <span className="h-full w-[10%] centerDiv">
            <CiSearch className="text-[1.6rem]" />
          </span>
          <input
            className="h-[90%] w-[70%] outline-none border-none"
            type="text"
            name="searchKey"
            value={searchKey}
            placeholder="start typing..."
            onChange={handleInputChange}
          />
          {searchKey.length > 0 && (
            <span className="h-full w-[10%] centerDiv">
              <IoCloseCircleSharp
                onClick={() => cancelSearchOperation()}
                className="text-[1.6rem]"
              />
            </span>
          )}
        </div>
        {/* <div className="absolute top-[80%] left-5 h-auto max-h-[400px] w-[90%] p-2 flex flex-col z-[999] bg-[#f4f4f4] gap-3 overflow-y-scroll">
          {bestSellingProducts &&
            bestSellingProducts.map((product) => (
              <div
                key={`mobSearch-${product._id}`}
                className="h-[80px] w-full flex gap-1 shadow-lg"
              >
                <div className="h-full w-[25%] centerDiv">
                  <img
                    src={product.productCartImage}
                    alt="productImage"
                    className="h-[70px] w-[70px] bg-cover"
                  />
                </div>
                <div className="h-full w-[75%] flex flex-col">
                  <div className="h-[40%] w-full pl-2 addFont truncate">
                    {product.name}
                  </div>
                  <div className="h-[50%] w-full pl-2 text-[0.9rem] truncate opacity-[80%]">
                    {product.productInfo}
                  </div>
                </div>
              </div>
            ))}
        </div> */}
      </div>
      {loading ? (
        <CircularSpinner />
      ) : (
        <div className="h-auto w-full flex flex-col centerDiv gap-2">
          {notFoundFlag && searchKey.length > 0 && searchResult.length == 0 && (
            <div className="h-[60px] w-full items-center pl-[6%] addFont capitalize text-[1.05rem] centerToPage">
              sorry, no result found, try something else
            </div>
          )}
          {searchResult &&
            searchResult.length > 0 &&
            searchResult.map((product, index) => (
              <div
                key={`${index}-result-${product._id}`}
                className="h-[160px] w-[350px] flex bg-[#f4f4f4] rounded-lg items-center"
              >
                <div className="h-[150px] w-full flex p-2 items-center">
                  <div className="h-full w-[135px] flex items-center ">
                    <img
                      src={product.productCartImage}
                      alt="productImage"
                      className="h-[130px] w-[130px] bg-cover rounded-md"
                    />
                  </div>
                  <div className="h-full flex-1 flex flex-col gap-2">
                    <div className="h-auto w-full flex flex-col">
                      <span className="h-auto w-full addFont p-1 overflow-hidden">
                        {product.name}
                      </span>
                      <span className="h-auto w-full opacity-[70%] text-[0.9rem] p-1 overflow-hidden">
                        {product.productInfo}
                      </span>
                    </div>
                    <div className="h-[70px] w-full flex">
                      <span className="h-full w-[50%] addFont text-[0.98rem] flex items-center pl-2">
                        ₹ {product.price}
                      </span>
                      <span className=" h-auto w-[50%] flex items-center">
                        <button className=" h-[30px] w-[90px] bg-[#16754a] text-[white] rounded-[20px] text-[0.8rem] addFont ">
                          Add Item
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="h-auto w-full flex flex-col centerDiv">
            {searchKey.length == 0 && (
              <div className="h-[60px] w-full flex items-center pl-[6%] addFont capitalize text-[1.05rem] flex-shrink-0">
                you may enjoy our bestsellings!!
              </div>
            )}
            {searchKey.length == 0 &&
              bestSellingProducts &&
              bestSellingProducts.map((product, index) => (
                <div
                  key={`${index}-small-${product._id}`}
                  className="h-[160px] w-[350px] flex bg-[#f4f4f4] rounded-lg items-center"
                >
                  <div className="h-[150px] w-full flex p-2 items-center">
                    <div className="h-full w-[135px] flex items-center ">
                      <img
                        src={product.productCartImage}
                        alt="productImage"
                        className="h-[130px] w-[130px] bg-cover rounded-md"
                      />
                    </div>
                    <div className="h-full flex-1 flex flex-col gap-2">
                      <div className="h-auto w-full flex flex-col">
                        <span className="h-auto w-full addFont p-1 overflow-hidden">
                          {product.name}
                        </span>
                        <span className="h-auto w-full opacity-[70%] text-[0.9rem] p-1 overflow-hidden">
                          {product.productInfo}
                        </span>
                      </div>
                      <div className="h-[70px] w-full flex">
                        <span className="h-full w-[50%] addFont text-[0.98rem] flex items-center pl-2">
                          ₹ {product.price}
                        </span>
                        <span className=" h-auto w-[50%] flex items-center">
                          <button className=" h-[30px] w-[90px] bg-[#16754a] text-[white] rounded-[20px] text-[0.8rem] addFont ">
                            Add Item
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
