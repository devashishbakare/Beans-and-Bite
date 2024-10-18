import React, { useEffect, useState } from "react";
import { History } from "./History";
import { useDispatch, useSelector } from "react-redux";
import { addFromNavbar, addToHistory } from "../redux/slices/historySlice";
import { FaLocationDot } from "react-icons/fa6";
import { takeAwayStores, storeMapper } from "../utils/DisplayData";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import {
  fetchProductFromCart,
  orderProducts,
  razorpayCreateOrder,
  razorpayVarifyOrder,
} from "../utils/api";
import { ToastContainer } from "react-toastify";
import { PiWarningOctagonFill } from "react-icons/pi";
import { updateNavbarOptionSelection } from "../redux/slices/NavbarSlice";
import { resetCount } from "../redux/slices/notificationSlice";
import { TiPen } from "react-icons/ti";
import { IoWallet } from "react-icons/io5";
// import { cartProductInfo } from "../utils/DisplayData";
import {
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification,
} from "../utils/notification";
import CircularSpinner from "../utils/Spinners/CircularSpinner";
import { setWalletAmount } from "../redux/slices/notificationSlice";
//todo : fetch card product details from db with useEffect and show here
//todo : customization can be handle with setting up customization details to store same as cart
export const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userAuth);
  const { wallet } = useSelector((state) => state.notification);
  const [showStoreSelectionModal, setShowStoreSelectionModal] = useState(false);
  const [citySelection, setCitySelection] = useState("");
  const [showCityOption, setShowCityOption] = useState(false);
  const [cityStoreSelectionId, setCityStoreSelectionId] = useState(-1);
  const [cartProducts, setCartProducts] = useState([]);
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bill, setBill] = useState({
    subAmount: 0,
    orderAmount: 0,
    tax: 0,
  });
  const [paymentMethodModal, setPaymetMethodModal] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);
  useEffect(() => {
    const updateHistory = () => {
      dispatch(addFromNavbar({ sectionName: "Cart" }));
      dispatch(addToHistory({ sectionName: "Confirm Order" }));
    };
    const fetchCartProducts = async () => {
      setIsLoading(true);
      const response = await fetchProductFromCart(token);
      if (response.success) {
        //console.log(response.data);
        let tempCost = 0;
        response.data.forEach((cartItem) => (tempCost += cartItem.amount));
        let perCent = tempCost / 100;
        let gst = 5 * perCent;
        const billObject = {
          subAmount: tempCost,
          orderAmount: gst + tempCost,
          tax: gst,
        };
        setBill(billObject);
        setCartProducts(response.data);
      } else {
        showErrorNotification("something went wrong, please try again later");
      }
      setIsLoading(false);
    };
    updateHistory();
    fetchCartProducts();
  }, []);

  const handleOutSideBoxCloseModal = (event) => {
    if (event.target.id == "storeOptionModal") {
      setShowStoreSelectionModal(false);
    }
  };

  const handleCitySelection = (cityName) => {
    // console.log(cityName, "reached in updating city");
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

  const handleOutsideBoxCloseForPaymentModal = (event) => {
    const id = event.target.id;
    if (id == "payOptionModal") {
      setPaymetMethodModal(false);
    }
  };

  const handlePlaceOrder = () => {
    if (cityStoreSelectionId == -1) {
      showWarningNotification("Please Select Store Before Proceeding");
    } else {
      setPaymetMethodModal(true);
    }
  };

  const handlePayOptions = async (paymentMethod) => {
    let products = [];
    cartProducts.forEach((cartProduct) => products.push(cartProduct._id));

    const orderDetails = {
      products,
      takeAwayFrom: storeMapper[cityStoreSelectionId - 1].storeAddress,
      amount: Number(bill.orderAmount.toFixed(2)),
      paymentMethod,
      additionalMessage,
    };

    if (paymentMethod == "Wallet") {
      setPaymetMethodModal(false);
      setPaymentLoader(true);
      const response = await orderProducts(token, orderDetails);
      //console.log("order response", response);
      if (response.success) {
        dispatch(setWalletAmount({ amount: response.data.walletAmount }));
        dispatch(resetCount({ requestFor: "cart" }));
        showSuccessNotification("Order has been confirmed!!");
        //todo: you can move user to order summery page
        //todo : you can have something to re-direct
      } else {
        showErrorNotification("something went wrong, please try again later");
      }
      setPaymentLoader(false);
    } else {
      setPaymetMethodModal(false);
      setPaymentLoader(true);
      const response = await razorpayCreateOrder(
        token,
        Number(bill.orderAmount.toFixed(2))
      );
      if (response.success) {
        handleOpenRazerpay(response.data, orderDetails);
      } else {
        setPaymentLoader(false);
        showErrorNotification("something went wrong, please try again later");
      }
    }
  };

  const handleOpenRazerpay = (createOrderDetails, orderDetails) => {
    var options = {
      key: "rzp_test_uYsyA6UZFPgGxV",
      amount: Number(createOrderDetails.amount),
      currency: createOrderDetails.currency,
      name: "Beans and Bite",
      description: "Test Transaction",
      image:
        "http://res.cloudinary.com/djgouef8q/image/upload/v1728289204/c6mavwy6p93u2vzp8lic.png",
      order_id: createOrderDetails.id,
      handler: async function (response) {
        setPaymentLoader(true);
        const data = {
          giftOrder_id: createOrderDetails.id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          razorpay_payment_id: response.razorpay_payment_id,
        };
        const responseForVarification = await razorpayVarifyOrder(data);
        //console.log(responseForVarification, "verify response");
        if (responseForVarification.success === true) {
          const response = await orderProducts(token, orderDetails);
          //console.log(response, "pay via payment gateway response");

          if (response.success) {
            showSuccessNotification("Order has been confirmed!!");
            dispatch(resetCount({ requestFor: "cart" }));
          } else {
            showErrorNotification(
              "something went wrong, please try again later"
            );
          }
        } else {
          showErrorNotification("something went wrong, please try again later");
        }
        setPaymentLoader(false);
      },
      prefill: {},
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp = new window.Razorpay(options);
    //console.log("requesting for open razorpay");
    setPaymentLoader(false);
    rzp.open();
  };

  return (
    <div className="h-full w-full flex flex-col relative">
      {paymentMethodModal && (
        <div
          onClick={(e) => handleOutsideBoxCloseForPaymentModal(e)}
          id="payOptionModal"
          className="absolute centerToPage z-[8890] h-[100vh] w-[100vw] bg-black bg-opacity-15 centerDiv "
        >
          <div className="addShadow h-auto w-[90%] min-w-[300px] max-w-[600px] centerDiv flex-col p-2 gap-[10px] rounded-md bg-slate-50 md:w-[500px] ">
            <span className="h-[auto] w-[90%] p-2 addFont text-center ">
              Choose your preferred payment method, Use your Wallet balance or
              proceed with a Payment Gateway
            </span>
            <div className="h-[50px] w-[90%] centerDiv gap-2">
              <button
                onClick={() => handlePayOptions("Wallet")}
                className=" h-[40px] w-[120px] capitalize text-[0.89rem] theamColor text-white rounded-md p-2 md:h-[40px]"
              >
                Wallet
              </button>
              <button
                onClick={() => handlePayOptions("Payment Gateway")}
                className=" h-[40px] w-[180px] capitalize text-[0.89rem] theamColor text-white rounded-md p-2 md:h-[40px]"
              >
                payment gateway
              </button>
            </div>
            <div className="h-[50px] w-full flex items-center gap-2 centerDiv">
              <IoWallet className="text-[1.3rem]" />
              <span className="addFont text-[0.95rem]">Wallet Balance :</span>
              <span className="">{wallet == null ? 0 : wallet}</span>
            </div>
          </div>
        </div>
      )}
      {paymentLoader == true && (
        <div className="centerToPage h-[120px] w-[250px] z-[9999] bg-white flex flex-col items-center p-2 addShadow rounded-md">
          <span className="h-[50%] w-full text-center addFont">
            we are processing your request please wait
          </span>
          <span className="h-[50%] w-full centerDiv">
            <CircularSpinner />
          </span>
        </div>
      )}
      <div className="h-[9vh] w-full centerDiv theamColor">
        <div className="h-full w-full centerDiv  max-w-[1050px]">
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
                {takeAwayStores.map((cityData, index) => (
                  <div
                    key={"cityData" + index}
                    className="h-auto w-full flex items-cente "
                  >
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
                                  data-testid={`radio-${city.id}`}
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
          </div>
        </div>
      )}
      <div className="h-[91vh] w-full flex flex-col overflow-y-scroll gap-2">
        <div className="h-auto w-full centerDiv">
          <div className="h-full w-full max-w-[1050px] flex flex-col gap-1">
            <div className="h-auto w-full flex flex-col shrink-0 md:h-[70px] md:flex-row">
              <div className="h-[60px] w-full flex items-center mt-[10px] ml-[10px] gap-[10px] md:w-[400px]">
                <span className="uppercase pl-[10px] addFont text-[1.1rem]">
                  Take-away from
                </span>
                <FaLocationDot className="text-[1.2rem] mb-[2px]" />
                {(citySelection.length == 0 || cityStoreSelectionId == -1) && (
                  <button
                    data-testid="selectCityTest"
                    onClick={() => setShowStoreSelectionModal(true)}
                    className=" capitalize h-[40px] w-[120px] theamColor text-[#f4f4f4] rounded-full text-[0.9rem] font-light ml-[10px]"
                  >
                    select store
                  </button>
                )}
              </div>

              {cityStoreSelectionId != -1 && (
                <div className="h-auto w-[90%] flex flex-col gap-2 shrink-0 mt-[10px] ml-[10px] addShadow rounded-md p-2 relative lg:pr-[40px] md:w-auto lg:flex-row lg:items-center">
                  <span
                    onClick={() => handleStoreChange()}
                    className="absolute top-1 right-1 h-[30px] w-[30px] centerDiv lg:top-4"
                  >
                    <IoIosCloseCircle className="text-[1.6rem]" />
                  </span>
                  <span className="addFont pl-[10px] md:pl-[5px]">
                    {storeMapper[cityStoreSelectionId - 1].cityName}
                  </span>
                  <span className="text-[0.9rem] opacity-85 pl-[5px] flex shrink-0">
                    {storeMapper[cityStoreSelectionId - 1].storeAddress}
                  </span>
                </div>
              )}
            </div>

            <div className="h-auto w-full flex flex-col p-2 gap-[15px] shrink-0">
              <div className="h-[50px] w-full addFont text-[0.95rem] flex items-center pl-[10px]">
                Cart Products
              </div>
              {isLoading ? (
                <div className="h-[100px] w-full centerDiv">
                  <CircularSpinner />
                </div>
              ) : (
                <div className="h-auto w-full flex flex-col gap-[10px] shrink-0">
                  {cartProducts.map((cartProductInfo) => (
                    <div
                      key={"order" + cartProductInfo._id}
                      className="h-auto w-full shrink-0 flex flex-col p-2 addShadow rounded-md gap-2"
                    >
                      <div className="h-[80px] w-full flex">
                        <span className="h-full w-[80px]">
                          <img
                            src={cartProductInfo.productId.productCartImage}
                            alt="productImage"
                            className="h-full w-full bg-cover rounded-md"
                          />
                        </span>
                        <div className="h-full flex-1 flex flex-col gap-2">
                          <span className="h-auto flex-1 flex items-center addFont pl-[10px] md:pl-[20px]">
                            {cartProductInfo.productId.name}
                          </span>
                          {cartProductInfo.productId.productType == "Veg" ? (
                            <div className="h-[50%] w-full flex gap-2 pl-[10px] md:pl-[20px]">
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
                            <div className="h-[50%] w-full flex items-center gap-1 pl-[10px]">
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
                      </div>
                      <div className="h-auto w-full flex flex-wrap p-2 gap-1 opacity-75 md:hidden">
                        <span className="h-auto w-auto flex items-center text-[0.85rem] shrink-0">
                          {cartProductInfo.size}&#44;
                        </span>
                        <span className="h-auto w-auto flex items-center text-[0.85rem] shrink-0">
                          {cartProductInfo.milk}&#44;
                        </span>
                        <span className="h-auto w-auto flex items-center text-[0.85rem] shrink-0">
                          {cartProductInfo.espresso}&#44;
                        </span>
                        <span className="h-auto w-auto flex items-center text-[0.85rem] shrink-0">
                          {cartProductInfo.temperature}&#44;
                        </span>
                        <span className="h-auto w-auto flex items-center text-[0.85rem] shrink-0">
                          {cartProductInfo.whippedTopping}&#44;
                        </span>
                        {cartProductInfo.syrupAndSauces.length > 0 &&
                          cartProductInfo.syrupAndSauces.map((data, index) => (
                            <span
                              key={"cartCusto" + data.type + index}
                              className="h-auto w-auto flex items-center text-[0.85rem] shrink-0"
                            >
                              {data.type}
                              {index !=
                                cartProductInfo.syrupAndSauces.length - 1 && (
                                <>&#44;</>
                              )}
                            </span>
                          ))}
                      </div>
                      <div className="h-[40px] w-full flex justify-between items-center p-2 md:h-[60px]">
                        <span className="h-full w-auto addFont flex items-center ml-[5px] text-[0.95rem]">
                          Price : {cartProductInfo.amount} ₹
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateNavbarOptionSelection({ option: "Cart" })
                            )
                          }
                          className="h-full w-auto underline addFont text-blue-800 mr-[5px] text-[0.95rem] cursor-pointer"
                        >
                          see details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <hr className="border-b-[1px] border-gray-500 mt-[20px]" />
              <div
                onClick={() =>
                  dispatch(updateNavbarOptionSelection({ option: "Order" }))
                }
                className="h-[50px] w-full pl-[10px] flex items-center capitalize text-[0.9rem] underline baseColor"
              >
                + add more items
              </div>
              <div className="h-auto w-full flex flex-col items-center">
                <div className="h-[40px] w-full pl-[10px] flex gap-1 items-center">
                  <TiPen className="text-[1.5rem]" />
                  <span className="addFont text-[0.9rem] opacity-90 capitalize">
                    any other request?
                  </span>
                </div>
                <div className="p-3 w-[98%] border-[1px] border-gray-500 mt-[10px] bg-[#f4f4f4] rounded-md">
                  <textarea
                    id="message"
                    rows="4"
                    className="mt-1 p-2 w-full focus:outline-none focus:ring-0 focus:border-transparent resize-none text-[0.9rem] bg-[#f4f4f4] no-scrollbar"
                    placeholder="have something specific in mind? write it down and we will let our beristas know"
                    value={additionalMessage}
                    onChange={(e) => setAdditionalMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto w-full centerDiv bg-[#edebe9]">
          <div className="h-auto w-full max-w-[1050px] flex flex-col shrink-0 pl-[10px] pr-[10px]">
            <div className="h-[250px] w-full max-w-[1050px] flex flex-col">
              <span className="h-[50px] w-full flex pl-[10px] uppercase addFont text-[1.1rem] items-center">
                Bill Details
              </span>
              <div className="h-[40px] w-full flex justify-between pl-[10px] pr-[10px] items-center">
                <span className="text-[0.95rem] font-light capitalize opacity-90 pl-[2px]">
                  sub total
                </span>
                <span className="text-[0.95rem] font-light capitalize opacity-90">
                  {isLoading == true ? 0 : bill.subAmount} ₹
                </span>
              </div>
              <div className="h-[40px] w-full flex justify-between pl-[10px] pr-[10px] items-center">
                <span className="text-[0.95rem] font-light capitalize opacity-90 pl-[2px]">
                  discount
                </span>
                <span className="text-[0.95rem] font-light capitalize opacity-90">
                  0 ₹
                </span>
              </div>
              <div className="h-[40px] w-full flex justify-between pl-[10px] pr-[10px] items-center">
                <span className="text-[0.95rem] font-light capitalize opacity-90 pl-[2px]">
                  5% GST
                </span>
                <span className="text-[0.95rem] font-light capitalize opacity-90">
                  {isLoading == true ? 0 : bill.tax.toFixed(2)} ₹
                </span>
              </div>
              <hr className="border-b-[1px] border-gray-500 mt-[20px]" />
              <div className="h-[50px] w-full flex justify-between pl-[10px] pr-[10px] items-center">
                <span className="text-[0.95rem] addFont uppercase pl-[2px]">
                  Total
                </span>
                <span className="text-[0.95rem] font-light capitalize opacity-90">
                  {isLoading == true ? 0 : bill.orderAmount.toFixed(2)} ₹
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto w-full centerDiv p-3">
          <div className="h-auto w-full max-w-[1050px] addShadow rounded-lg flex flex-col p-5">
            <span className="h-auto w-full flex items-center gap-1 addFont">
              <span className="h-[60px] w-auto flex items-start pt-[6px] md:h-[40px] md:items-center md:pt-[0px]">
                <PiWarningOctagonFill className="text-[1.4rem]" />
              </span>
              <span className=" ml-[3px] h-[60px] flex items-center gap-1 addFont md:h-[40px]">
                Order once placed cannot be cancelled
              </span>
            </span>
            <span className="h-auto w-full flex items-center text-[0.85rem] opacity-85">
              Review your oder and address details to avoid cancellation. please
              avoid cancellation to prevent food wastage
            </span>
          </div>
        </div>
        <div className="h-auto w-full centerDiv bg-[#116241]">
          <div className="h-[80px] w-full max-w-[1050px] flex justify-between items-center pr-[5px]">
            <span className="text-white pl-[15px]">
              {isLoading == true ? 0 : bill.orderAmount.toFixed(2)} ₹
            </span>
            <button
              onClick={() => handlePlaceOrder()}
              data-testid="placeOrderTest"
              className="h-[40px] w-[130px] addFont capitalize text-[0.89rem] bg-slate-200 rounded-3xl z-[9999] md:w-[220px]"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
