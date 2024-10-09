import React, { useCallback, useState, useEffect } from "react";
import propTypes from "prop-types";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { CiShoppingCart, CiHeart, CiSearch } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoCloseCircleSharp, IoEllipseSharp } from "react-icons/io5";
import { debounce } from "lodash";
import { fetchSearchResult } from "../utils/api";
import { ToastContainer } from "react-toastify";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/notification";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { resetUserAuth } from "../redux/slices/userAuthSlice";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
import { resetProductSlice } from "../redux/slices/productSlice";
import { resetNavbarSlice } from "../redux/slices/NavbarSlice";
import { resetHistory } from "../redux/slices/historySlice";
import { resetNotification } from "../redux/slices/notificationSlice";
import { resetProductInfo } from "../redux/slices/ProductInfoSlice";
import { updateSignInUpModal } from "../redux/slices/userAuthSlice";
import { resetCart } from "../redux/slices/cartSlice";
import { updateFavouriteOnLogout } from "../utils/api";
export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userAuth);
  const { cartCount, favoriteCount, favorites } = useSelector(
    (state) => state.notification
  );
  const [searchIconClick, setSearchIconClick] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultFlag, setSearchResultFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const fetchSearchWithDebouncing = useCallback(
    debounce(async (input, page) => {
      console.log(input, page);
      if (input) {
        setIsLoading(true);
        console.log("while calling");
        console.log(input, page);
        const response = await fetchSearchResult(input, page);
        if (response.success) {
          setSearchResult(response.data);
          console.log(response);
          setSearchResultFlag(true);
          setTotalPages(response.totalPages);
          setCurrentPage(response.currentPage);
        } else {
          showErrorNotification("something went wrong, please try again later");
        }
        setIsLoading(false);
      } else {
        setSearchResult([]);
      }
    }, 700),
    []
  );
  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchKey(input);
    fetchSearchWithDebouncing(input, 1);
  };
  useEffect(() => {
    return () => {
      fetchSearchWithDebouncing.cancel();
    };
  }, []);

  const handleCloseSearch = () => {
    setSearchResult([]);
    setSearchKey("");
    setSearchResultFlag(false);
    setTotalPages(0);
    setCurrentPage(0);
  };

  const handlePaginationNavigation = (requestFor) => {
    console.log(currentPage);
    if (requestFor === "prev") {
      fetchSearchWithDebouncing(searchKey, currentPage - 1);
    } else {
      console.log("from next");
      fetchSearchWithDebouncing(searchKey, currentPage + 1);
    }
  };

  const handleShowProfilePage = () => {
    // todo : if there is token then move to profile page
    // todo : else show signInModal
    if (token == null) {
      dispatch(updateSignInUpModal({ requestFor: "open" }));
    } else {
      showSuccessNotification("user already login");
    }
  };

  const handleLogOut = async () => {
    const response = await updateFavouriteOnLogout(token, favorites);
    console.log(response.message);
    dispatch(resetUserAuth());
    dispatch(resetProductSlice());
    dispatch(resetNavbarSlice());
    dispatch(resetHistory());
    dispatch(resetProductInfo());
    dispatch(resetNotification());
    dispatch(resetCart());
    persistor.purge();
    navigate("/uploadImages");
  };

  return (
    <div className="h-full w-full max-w-[1050px] flex">
      <div className="h-full w-[80px] ml-3 centerDiv">
        <div className="h-[45px] w-[45px] rounded-[50%]">
          <img
            src="http://res.cloudinary.com/djgouef8q/image/upload/v1724295399/hkijeoyi8l90co1j2yeu.png"
            alt="logo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="h-full flex-1 flex gap-2 ml-2">
        {searchIconClick === false ? (
          <>
            <div
              onClick={() =>
                dispatch(updateNavbarOptionSelection({ option: "Home" }))
              }
              className="h-full min-w-[70px] centerDiv"
            >
              Home
            </div>
            <div
              onClick={() =>
                dispatch(updateNavbarOptionSelection({ option: "Gift" }))
              }
              className="h-full min-w-[70px] centerDiv"
            >
              Gift
            </div>
            <div
              onClick={() =>
                dispatch(updateNavbarOptionSelection({ option: "Order" }))
              }
              className="h-full min-w-[70px] centerDiv"
            >
              Order
            </div>
            <div
              onClick={() =>
                dispatch(updateNavbarOptionSelection({ option: "wallet" }))
              }
              className="h-full min-w-[70px] centerDiv"
            >
              Wallet
            </div>
          </>
        ) : (
          <div className="h-full w-[95%] centerDiv">
            <div className="h-[70%] ml-[10%] w-full border-[1.2px] border-gray-400 rounded-[30px] flex items-center bg-[#f9f9f8] relative">
              <span
                onClick={() => setSearchIconClick(false)}
                className="h-full w-[50px] centerDiv"
              >
                <IoIosArrowRoundBack className="text-[1.8rem]" />
              </span>
              <input
                className="h-[85%] w-[75%] ml-[5%] border-none outline-none bg-[#f9f9f8]"
                type="text"
                value={searchKey}
                onChange={handleInputChange}
                placeholder="Looking for something specific?"
              />
              {searchKey.length > 0 && (
                <span
                  onClick={handleCloseSearch}
                  className="h-full w-[50px] centerDiv"
                >
                  <IoCloseCircleSharp className="text-[1.5rem]" />
                </span>
              )}
              <div className="absolute top-[120%] left-5 h-auto w-[95%] flex flex-col z-[999] bg-[#edebe9]  gap-3 overflow-y-scroll items-center">
                {isLoading ? (
                  <div className="h-[80px] w-full centerDiv">
                    <CircularSpinner />
                  </div>
                ) : (
                  <>
                    {searchResult.length == 0 &&
                    searchKey.length > 0 &&
                    searchResultFlag == true ? (
                      <div className="h-[60px] w-full flex items-center pl-[6%] font-medium capitalize text-[1.05rem]">
                        sorry, no result found, try something else
                      </div>
                    ) : (
                      searchResult &&
                      searchResult.map((product, index) => (
                        <div
                          key={`mobSearch-${product._id}`}
                          className={`h-[80px] w-[95%] p-2 flex gap-1 addShadow bg-[#f4f4f4] ${
                            index == 0 && `mt-[10px]`
                          }`}
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
                      ))
                    )}
                    {totalPages > 1 && (
                      <div className="h-[60px] w-[95%] flex items-center justify-between">
                        <div className="h-full w-[50%] flex items-center">
                          {currentPage > 1 && (
                            <button
                              onClick={() => handlePaginationNavigation("prev")}
                              className="h-[40px] w-[100px] border-[1px] border-[#1e3933] baseColor addFont rounded-md ml-[2%]"
                            >
                              Prev
                            </button>
                          )}
                        </div>

                        <div className="h-full w-[50%] flex flex-row-reverse items-center">
                          {currentPage < totalPages && (
                            <button
                              onClick={() => handlePaginationNavigation("next")}
                              className="h-[40px] w-[100px] border-[1px] border-[#1e3933] baseColor addFont rounded-md ml-[2%]"
                            >
                              next
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`h-full flex flex-row-reverse gap-1 ${
          searchIconClick ? "w-[220px]" : "w-[280px]"
        }`}
      >
        <div
          onClick={handleShowProfilePage}
          className="h-full w-[60px] centerDiv"
        >
          <HiOutlineUserCircle className="text-[2.1rem] text-[#1e3933]" />
        </div>
        <div className="h-full w-[60px] centerDiv relative">
          <CiShoppingCart
            onClick={() =>
              dispatch(updateNavbarOptionSelection({ option: "cart" }))
            }
            className="text-[1.8rem] text-[#1e3933]"
          />
          {cartCount > 0 && (
            <span className="absolute top-[10px] right-[5px] h-[20px] w-[20px] rounded-[50%] centerDiv text-[0.8rem] bg-[#1e3933] text-white">
              {cartCount}
            </span>
          )}
        </div>
        <div className="h-full w-[60px] centerDiv relative">
          <CiHeart
            onClick={() =>
              dispatch(updateNavbarOptionSelection({ option: "favourite" }))
            }
            className="text-[1.8rem] text-[#1e3933]"
          />
          {favoriteCount > 0 && (
            <span className="absolute top-[10px] right-[5px] h-[20px] w-[20px] rounded-[50%] centerDiv text-[0.8rem] bg-[#1e3933] text-white">
              {favoriteCount}
            </span>
          )}
        </div>
        {searchIconClick === false && (
          <div className="h-full w-[60px] centerDiv">
            <CiSearch
              onClick={() => setSearchIconClick(true)}
              className="text-[1.8rem] text-[#1e3933]"
            />
          </div>
        )}
        <div className="h-full w-[80px] centerDiv">
          <button onClick={handleLogOut} className="h-[50px] w-full addBorder">
            Logout
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
    // <div className="h-full w-full addBorder">Hello there</div>
  );
};

Navbar.propTypes = {
  openSignInUpModal: propTypes.func,
};
