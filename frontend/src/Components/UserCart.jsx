import React from "react";
import { useEffect, useState } from "react";
import { fetchProductFromCart, deleteCartItem } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { showErrorNotification } from "../utils/notification";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import PageSpinner from "../utils/Spinners/PageSpinner";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { decrementCount } from "../redux/slices/notificationSlice";
import { addProductInfo } from "../redux/slices/ProductInfoSlice";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
//import { sampleProductCart } from "../utils/DisplayData";
import {
  updateCartPrice,
  addCartProductQuantity,
  updateCartProductQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { updateSignInUpModal } from "../redux/slices/userAuthSlice";
export const UserCart = () => {
  //todo : we have to take care of cart notification here, keep in mind
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.userAuth);
  const [cartProducts, setCartProducts] = useState([]);
  const [globalLoader, setGlobalLoader] = useState(false);
  const [loaderIndex, setLoaderIndex] = useState(-1);
  const { cartPrice, cartProductWithQuantity } = useSelector(
    (state) => state.cart
  );

  const [showCartModal, setShowCartModal] = useState(false);
  const [storeProductUpdateInfo, setStoreProductUpdateInfo] = useState({});
  const [showCartCustomizationDetails, setShowCartCustomizationDetails] =
    useState([]);

  useEffect(() => {
    const fetchCartProduct = async (token) => {
      if (isAuthenticated == false) {
        dispatch(updateSignInUpModal({ requestFor: "open" }));
      } else {
        setGlobalLoader(true);
        const response = await fetchProductFromCart(token);
        if (response.success) {
          // console.log(response.data);

          let initialCartProductWithQuantity = [];
          response.data.forEach((cartProduct) => {
            initialCartProductWithQuantity.push({
              cartId: cartProduct._id,
              quantity: 1,
              cartProductPrice: cartProduct.amount,
            });
          });

          dispatch(
            addCartProductQuantity({
              cartProducts: initialCartProductWithQuantity,
            })
          );
          // setCartProductQuantity(new Array(response.data.length).fill(1));
          setShowCartCustomizationDetails(
            new Array(response.data.length).fill(false)
          );
          setCartProducts(response.data);
          //setCartItemLoaders(new Array(response.data.length).fill(false));
        } else {
          showErrorNotification(response.error);
        }
        setGlobalLoader(false);
      }
    };
    fetchCartProduct(token, isAuthenticated);
  }, [token, isAuthenticated]);

  const handleShowCartCustomization = (cartProductIndex) => {
    setShowCartCustomizationDetails((previousCartCustomization) =>
      previousCartCustomization.map((details, index) => {
        if (index == cartProductIndex) return !details;
        return details;
      })
    );
  };

  const handleCartModalResponse = (request) => {
    if (request == "keep") {
      const { cartItem } = storeProductUpdateInfo;
      const updatedPrice = cartItem.amount + cartPrice;
      const updatedQuantity = cartProductWithQuantity[cartItem._id] + 1;
      dispatch(
        updateCartProductQuantity({
          cartId: cartItem._id,
          quantity: updatedQuantity,
        })
      );
      dispatch(updateCartPrice({ price: updatedPrice }));

      setStoreProductUpdateInfo({});
    } else {
      const { cartItem } = storeProductUpdateInfo;
      customizedSameProduct(cartItem);
    }
    setShowCartModal(false);
  };

  const handleIncreaseQuanity = (cartItem, index) => {
    setStoreProductUpdateInfo({ cartItem, index });
    setShowCartModal(true);
  };

  const handleDecreaseQuantity = async (cartItem, index) => {
    const cartId = cartItem._id;
    const updatedCost = cartPrice - cartItem.amount;
    if (cartProductWithQuantity[cartId] == 1) {
      setLoaderIndex(index);
      const response = await deleteCartItem(token, cartId);
      // console.log(response);
      // console.log(response.success);
      if (response.success) {
        dispatch(removeFromCart({ cartId }));
        const storeMockProducts = cartProducts.filter(
          (cartProduct) => cartProduct._id !== cartId
        );
        dispatch(updateCartPrice({ price: updatedCost }));
        dispatch(decrementCount({ requestFor: "cart", count: 1 }));
        setCartProducts(storeMockProducts);

        setLoaderIndex(-1);
      } else {
        showErrorNotification("something went wrong, please try again later");
        setLoaderIndex(-1);
      }
    } else {
      const updatedQuantity = cartProductWithQuantity[cartId] - 1;
      dispatch(updateCartPrice({ price: updatedCost }));
      dispatch(
        updateCartProductQuantity({
          cartId: cartId,
          quantity: updatedQuantity,
        })
      );
    }
  };

  const handleAddSameWithDifferentCustomization = (
    product,
    customizationDetails
  ) => {
    // console.log("request fullfilled");
    dispatch(addProductInfo({ data: product, customizationDetails }));
    dispatch(updateNavbarOptionSelection("productOrder"));
  };

  const handleOutSideBoxCloseModal = (event) => {
    if (event.target.id == "cartModalParent") {
      setShowCartModal(false);
    }
  };

  const customizedSameProduct = (cartProduct) => {
    const customizationDetails = {
      size: cartProduct.size,
      milk: cartProduct.milk,
      espresso: cartProduct.espresso,
      temperature: cartProduct.temperature,
      whippedTopping: cartProduct.whippedTopping,
      syrupAndSauces: cartProduct.syrupAndSauces,
      price: cartProduct.amount / cartProductWithQuantity[cartProduct._id],
      cartId: cartProduct._id,
    };
    handleAddSameWithDifferentCustomization(
      cartProduct.productId,
      customizationDetails
    );
  };

  return (
    <div className="h-full w-full centerDiv flex flex-col relative ">
      {showCartModal && (
        <div
          onClick={(e) => handleOutSideBoxCloseModal(e)}
          id="cartModalParent"
          className="absolute centerToPage z-[8890] h-full w-full bg-black bg-opacity-15 centerDiv addBorder"
        >
          <div className="addShadow h-auto w-[300px] centerDiv flex-col p-2 gap-[10px] rounded-md bg-slate-50 md:w-[500px] ">
            <span className="h-[auto] w-[90%] p-2 addFont ">
              Do you want to add item with same customization?
            </span>
            <div className="h-[50px] w-[90%] centerDiv gap-2">
              <button
                onClick={() => handleCartModalResponse("keep")}
                className=" h-[55px] w-auto capitalize text-[0.89rem] theamColor text-white rounded-md p-2 md:h-[40px]"
              >
                keep the same
              </button>
              <button
                onClick={() => handleCartModalResponse("more")}
                className=" h-[55px] w-auto capitalize text-[0.89rem] theamColor text-white rounded-md p-2 md:h-[40px]"
              >
                Customized again
              </button>
            </div>
          </div>
        </div>
      )}
      {globalLoader == true ? (
        <div className="h-full w-full centerDiv">
          <PageSpinner />
        </div>
      ) : (
        <>
          <div className="flex-1 w-full max-w-[1050px] shrink-0 overflow-y-scroll flex flex-col p-2 gap-2">
            {cartProducts.length == 0 ? (
              <div className="h-full w-full centerDiv flex flex-col">
                <img
                  src="http://res.cloudinary.com/djgouef8q/image/upload/v1728017775/vqesytc0j5avasvpyxxl.png"
                  alt="emptyImage"
                  className="h-[250px] w-[250px] bg-cover rounded-[50%]"
                />
                <span className="addFont opacity-50 capitalize">
                  No item in your cart
                </span>
              </div>
            ) : (
              <>
                {cartProducts.map((cartProduct, index) => (
                  <div
                    key={"cartProducts" + index}
                    className="h-auto w-full flex flex-col p-2 addShadow rounded-md gap-3"
                  >
                    {loaderIndex == index ? (
                      <div className="h-[155px] w-full centerDiv">
                        <CircularSpinner />
                      </div>
                    ) : (
                      <>
                        <div className="h-[155px] w-full flex shrink-0">
                          <div className="h-full w-[150px]">
                            <img
                              src={cartProduct.productId.productCartImage}
                              alt="productImage"
                              className="h-[140px] w-[140px] bg-cover rounded-md"
                            />
                          </div>
                          <div className="h-full flex-1 flex flex-col gap-1 md:flex-row">
                            <div className="h-auto w-full flex flex-col gap-1 pl-1 md:w-[50%]">
                              <span className="h-[30px] w-full p-1 addFont overflow-hidden">
                                {cartProduct.productId.name}
                              </span>
                              <div className="h-auto w-full pl-1">
                                {cartProduct.productId.productType == "Veg" ? (
                                  <div className="h-auto w-full flex gap-2 md:h-full">
                                    <img
                                      src="http://res.cloudinary.com/djgouef8q/image/upload/v1725956565/evqd7oumunkyq2xmejzm.png"
                                      alt="vegImage"
                                      className="h-[20px] w-[20px] bg-cover"
                                    />
                                    <span className="uppercase font-light text-[0.8rem]">
                                      Vegetarian
                                    </span>
                                  </div>
                                ) : (
                                  <div className="h-full w-full flex items-center gap-1">
                                    <img
                                      src="http://res.cloudinary.com/djgouef8q/image/upload/v1725956639/apauehqqciemydmaguit.png"
                                      alt="NonImage"
                                      className="h-[20px] w-[20px] bg-cover"
                                    />
                                    <span className="uppercase font-light text-[0.8rem]">
                                      Non-Vegetarian
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="hide md:flex flex-col h-auto w-full">
                                <div className="h-auto w-full opacity-[70%] text-[0.9rem] p-1 overflow-hidden">
                                  {cartProduct.productId.productInfo}
                                </div>
                                <div className="h-[50px] w-full opacity-[70%] text-[0.9rem] p-1 overflow-hidden text-ellipsis line-clamp-3">
                                  {cartProduct.productId.productDetails}
                                </div>
                              </div>
                            </div>
                            <div className="h-auto w-full pl-2 flex flex-col gap-1 md:w-[50%] md:items-end md:gap-3 md:pr-[3%]">
                              <span className="h-[30px] flex items-center pl-1 md:w-[120px] md:text-[1.1rem] md:font-medium md:justify-end md:pr-[10px]">
                                ₹ {cartProduct.amount}
                              </span>
                              <div className="h-[50px] w-full flex items-center md:w-[150px]">
                                <div className="h-[40px] w-[140px] centerDiv border-[1px] border-gray-400 flex rounded-md cursor-pointer bg-white">
                                  <span
                                    onClick={() =>
                                      handleDecreaseQuantity(cartProduct, index)
                                    }
                                    className="h-[35px] w-[40px] centerDiv bg-slate-50"
                                  >
                                    <CiCircleMinus className="text-[1.7rem]" />
                                  </span>

                                  <span className="h-[35px] w-[40px] centerDiv bg-slate-50 ">
                                    {/* {cartProductQuantity[index]} */}
                                    {cartProductWithQuantity[cartProduct._id]}
                                  </span>

                                  <span
                                    onClick={() =>
                                      handleIncreaseQuanity(cartProduct, index)
                                    }
                                    className="h-[35px] w-[40px] centerDiv bg-slate-50 "
                                  >
                                    <CiCirclePlus className="text-[1.7rem]" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {(cartProduct.productId.category == "Bestseller" ||
                          cartProduct.productId.category == "Drinks") && (
                          <div
                            onClick={() => handleShowCartCustomization(index)}
                            className="h-[35px] w-full flex items-center pl-1 text-[0.95rem] text-blue-800 opacity-90 underline addBorder"
                          >
                            {showCartCustomizationDetails[index] == false
                              ? "show product customization details"
                              : "hide product customization details"}
                          </div>
                        )}

                        {showCartCustomizationDetails[[index]] == true && (
                          <div className="h-auto w-full flex flex-col">
                            <div className="h-auto w-full flex flex-wrap items-center font-thin">
                              <span className="h-[30px] w-auto flex items-center text-[0.85rem] pl-2">
                                {cartProduct.size}&#44;
                              </span>
                              <span className="h-[30px] w-auto flex items-center text-[0.85rem] pl-2">
                                {cartProduct.milk}&#44;
                              </span>
                              <span className="h-[30px] w-auto flex items-center text-[0.85rem] pl-2">
                                {cartProduct.espresso}&#44;
                              </span>
                              <span className="h-[30px] w-auto flex items-center text-[0.85rem] pl-2">
                                {cartProduct.temperature}&#44;
                              </span>
                              <span className="h-[30px] w-auto flex items-center text-[0.85rem] pl-2">
                                {cartProduct.whippedTopping}&#44;
                              </span>
                              {cartProduct.syrupAndSauces.length > 0 &&
                                cartProduct.syrupAndSauces.map(
                                  (data, index) => (
                                    <span
                                      key={"cartCusto" + data.type + index}
                                      className="h-[30px] w-auto flex items-center text-[0.85rem] pl-2"
                                    >
                                      {data.type}
                                      {index !=
                                        cartProduct.syrupAndSauces.length -
                                          1 && <>&#44;</>}
                                    </span>
                                  )
                                )}
                            </div>
                            <div
                              onClick={() => customizedSameProduct(cartProduct)}
                              className=" h-[30px] w-full flex item-center pl-1 text-[0.95rem] baseColor opacity-90 underline cursor-pointer"
                            >
                              Customized More
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
          {cartProducts.length > 0 && (
            <div className="h-[100px] w-full centerDiv bg-[#116241] centerDiv">
              <div className="h-full w-full max-w-[1050px] flex flex-col">
                <div className="h-[50%] w-full flex">
                  <div className="h-full flex-1 items-center flex text-slate-200">
                    <span className="h-full w-[135px] flex items-center truncate ml-[20px]">
                      Coffee Americano
                    </span>
                    {cartProducts.length > 1 && (
                      <span className="flex-1 ml-[5px]">
                        +{cartProducts.length - 1} more
                      </span>
                    )}
                  </div>
                  <div className="h-full w-[130px] flex items-center text-slate-200">
                    ₹ {cartPrice == null ? "0" : cartPrice.toFixed(2)}
                  </div>
                </div>
                <div className="h-[50%] w-full flex items-center justify-center  md:pr-[10px] md:justify-start md:flex-row-reverse">
                  <button
                    onClick={() =>
                      dispatch(
                        updateNavbarOptionSelection({ option: "confirmOrder" })
                      )
                    }
                    className="h-[75%] w-[95%] addFont capitalize text-[0.89rem] bg-slate-200 rounded-3xl z-[9999] md:w-[220px]"
                  >
                    proceed for order
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
};
