import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSignInUpModal } from "../redux/slices/userAuthSlice";
import { fetchFavouritesProduct } from "../utils/api";
import { ToastContainer } from "react-toastify";
import { showErrorNotification } from "../utils/notification";
import { ProductInfoCart } from "./ProductInfoCart";
// import { favouriteData } from "../utils/DisplayData";
import { addProductInfo } from "../redux/slices/ProductInfoSlice";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
import { removeFromFavorites } from "../redux/slices/notificationSlice";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import PageSpinner from "../utils/Spinners/PageSpinner";
export const Favourite = () => {
  //http://res.cloudinary.com/djgouef8q/image/upload/v1728017775/vqesytc0j5avasvpyxxl.png
  const { token, isAuthenticated } = useSelector((state) => state.userAuth);
  const { favorites } = useSelector((state) => state.notification);
  //   console.log(favourites, "this is favourites");
  const dispatch = useDispatch();
  const [userFavourites, setUserFavourites] = useState([]);
  const [localLoaderIndex, setLocalLoaderIndex] = useState(-1);
  const [globalLoader, setGlobalLoader] = useState(false);
  useEffect(() => {
    const fetchFavouriteProducts = async () => {
      if (isAuthenticated == false) {
        dispatch(updateSignInUpModal({ requestFor: "open" }));
      } else {
        setGlobalLoader(true);
        const response = await fetchFavouritesProduct(token, favorites);
        if (response.success) {
          console.log(response.data);
          setUserFavourites(response.data);
        } else {
          showErrorNotification("something went wrong, please try again later");
        }
        setGlobalLoader(false);
      }
    };

    fetchFavouriteProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addProductInfo({ data: product }));
    dispatch(updateNavbarOptionSelection("productOrder"));
  };

  const handleDeleteFromCart = (product, index) => {
    const productId = product._id;
    setLocalLoaderIndex(index);
    setUserFavourites((prevData) =>
      prevData.filter((data) => data._id != productId)
    );
    dispatch(removeFromFavorites({ productId }));
    setLocalLoaderIndex(-1);
  };

  return (
    <div className="h-full w-full centerDiv bg-[#edebe9 relative">
      <img
        src="http://res.cloudinary.com/djgouef8q/image/upload/v1724383231/kofsfd2k9puxunklexup.png"
        alt="flower"
        className="hide lg:flex absolute right-[20px] top-0 h-[80px] w-[80px] bg-cover"
      />
      {isAuthenticated == false ? (
        <div className="h-full w-full centerDiv"></div>
      ) : (
        <>
          {globalLoader == true ? (
            <div className="h-full w-full centerDiv">
              <PageSpinner />
            </div>
          ) : (
            <div className="h-full w-full max-w-[1050px]">
              {userFavourites.length == 0 ? (
                <div className="h-full w-full centerDiv flex flex-col">
                  <img
                    src="http://res.cloudinary.com/djgouef8q/image/upload/v1728017775/vqesytc0j5avasvpyxxl.png"
                    alt="emptyImage"
                    className="h-[250px] w-[250px] bg-cover rounded-[50%]"
                  />
                  <span className="addFont opacity-50 capitalize">
                    No item in favourites
                  </span>
                </div>
              ) : (
                <div className="h-full w-full flex flex-col gap-[10px] p-2">
                  {/* <ProductInfoCart products={userFavourites} /> */}
                  {userFavourites &&
                    userFavourites.map((product, index) => (
                      <div
                        key={"favPage" + product._id + index}
                        className="h-auto w-full flex flex-col p-1 rounded-md addShadow"
                      >
                        {localLoaderIndex == index ? (
                          <div className="h-[250px] w-full centerDiv">
                            <CircularSpinner />
                          </div>
                        ) : (
                          <>
                            <div className="h-[140px] w-full flex p-1 items-center gap-[6px]">
                              <img
                                src={product.productCartImage}
                                alt="productImage"
                                className="h-[120px] w-[120px] rounded-md"
                              />
                              <div className="h-full flex-1 flex flex-col gap-1 p-1 pl-2">
                                <span className="addFont text-[0.95rem] overflow-hidden shrink-0">
                                  {product.name}
                                </span>
                                <span className="addFont text-[0.8rem] shrink-0">
                                  {product.productInfo}
                                </span>
                                {product.productType != null &&
                                product.productType == "Veg" ? (
                                  <span className="h-[30px] w-full flex items-center pt-1 gap-2">
                                    <img
                                      src="http://res.cloudinary.com/djgouef8q/image/upload/v1725956565/evqd7oumunkyq2xmejzm.png"
                                      alt="vegImage"
                                      className="h-[20px] w-[20px] bg-cover"
                                    />
                                    <span className="uppercase text-[0.85rem]">
                                      Vegetarian
                                    </span>
                                  </span>
                                ) : (
                                  <span className="h-full w-full flex items-center gap-1">
                                    <img
                                      src="http://res.cloudinary.com/djgouef8q/image/upload/v1725956639/apauehqqciemydmaguit.png"
                                      alt="NonImage"
                                      className="h-[20px] w-[20px] bg-cover"
                                    />
                                    <span className="text-[#f4f4f4] uppercase text-[0.85rem]">
                                      Non-Vegetarian
                                    </span>
                                  </span>
                                )}
                                <div className="hide md:flex h-[50px] w-full text-[0.86rem] addFont overflow-hidden">
                                  {product.productDetails}
                                </div>
                              </div>
                            </div>
                            <div className="h-auto p-2 w-full text-[0.86rem] addFont md:hidden">
                              {product.productDetails}
                            </div>
                            <div className="h-[60px] w-full flex items-center gap-[10px] p-1">
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="h-[35px] w-[120px] theamColor text-white rounded-[20px] text-[0.8rem] addFont"
                              >
                                Add Item
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteFromCart(product, index)
                                }
                                className="h-[35px] w-[180px] bg-[#930909] text-white rounded-[20px] text-[0.8rem] addFont"
                              >
                                Remove from favourites
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};
