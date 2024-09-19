import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory } from "../redux/slices/historySlice";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { History } from "./History";
import {
  products,
  sizeOption,
  milkOption,
  espressoOption,
  temperatureOption,
  toppingOption,
  syrupAndSauceOption,
} from "../utils/DisplayData";
export const ProductOrder = () => {
  const dispatch = useDispatch();
  const product = products[1];
  const productSet = new Set(["Bestseller", "Drinks"]);
  const [slideAbove, setSlideAbove] = useState(new Array(2).fill(false));

  const [productSelection, setProductSelection] = useState({
    size: "Short",
    size_selected: 0,
    milk: "No Milk",
    milk_selected: 0,
    espresso: "",
    espresso_selected: 0,
    temperature: "",
    temperature_selected: -1,
    whippedTopping: "",
    whippedTopping_selected: 0,
    syrupAndSauces: [],
    syrupAndSauces_quantity_selected: new Array(5).fill(0),
    price: product.price,
  });

  // const { product } = useSelector((state) => state.productInfo);
  // console.log(product);
  // useEffect(() => {
  //   dispatch(addToHistory({ sectionName: "duhh" }));
  // }, []);
  const handleSlideAbove = (event, index) => {
    if (event.target.id == "topSlideHeading") {
      if (slideAbove[0] == true && slideAbove[1] == true) {
        let newSlide = new Array(2).fill(false);
        newSlide[0] = true;
        setSlideAbove(newSlide);
      } else {
        let newSlide = [...slideAbove];
        if (index == 0) {
          newSlide[0] = !newSlide[0];
        }
        setSlideAbove(newSlide);
      }
    }
    if (event.target.id == "bottomSlideHeading") {
      if (slideAbove[1] == true) {
        let newSlide = new Array(2).fill(false);
        setSlideAbove(newSlide);
      } else {
        let newSlide = new Array(2).fill(true);
        setSlideAbove(newSlide);
      }
    }
  };
  const updateProductSelection = (type, productData, index) => {
    const updateProductSelection = { ...productSelection };
    if (type == "size") {
      updateProductSelection.size = productData.size;
      updateProductSelection.price -=
        sizeOption[productSelection.size_selected].price;
      updateProductSelection.price += productData.price;
      updateProductSelection.size_selected = index;
    } else if (type == "milk") {
      updateProductSelection.milk = productData.type;
      updateProductSelection.price -=
        milkOption[productSelection.milk_selected].price;
      updateProductSelection.price += productData.price;
      updateProductSelection.milk_selected = index;
    } else if (type == "espresso") {
      updateProductSelection.espresso = productData.type;
      updateProductSelection.price -=
        espressoOption[productSelection.espresso_selected].price;
      updateProductSelection.price += productData.price;
      updateProductSelection.espresso_selected = index;
    } else if (type == "Temperature") {
      updateProductSelection.temperature = productData.type;
      updateProductSelection.temperature_selected = index;
    } else if (type == "whippedTopping") {
      updateProductSelection.whippedTopping = productData.type;
      updateProductSelection.price -=
        toppingOption[productSelection.whippedTopping_selected].price;
      updateProductSelection.price += productData.price;
      updateProductSelection.whippedTopping_selected = index;
    }
    setProductSelection(updateProductSelection);
  };

  const handleSauceAndSyrupQuantity = (
    quantityIndicator,
    optionData,
    optionIndex
  ) => {
    const updatedProductSelection = { ...productSelection };
    const tempSauceAndSyrup = [...productSelection.syrupAndSauces];
    const tempSauceAndSyrupQuantity = [
      ...productSelection.syrupAndSauces_quantity_selected,
    ];

    if (quantityIndicator == 0) {
      //you have to add it
      let itemIndex = tempSauceAndSyrup.findIndex(
        (item) => item.type == optionData.type
      );

      if (itemIndex != -1) {
        tempSauceAndSyrup[itemIndex].quantity =
          tempSauceAndSyrupQuantity[optionIndex] + 1;
        tempSauceAndSyrupQuantity[optionIndex] += 1;
        updatedProductSelection.price += optionData.price;
        updatedProductSelection.syrupAndSauces = tempSauceAndSyrup;
        updatedProductSelection.syrupAndSauces_quantity_selected =
          tempSauceAndSyrupQuantity;
      } else {
        tempSauceAndSyrup.push({ type: optionData.type, quantity: 1 });
        tempSauceAndSyrupQuantity[optionIndex] = 1;
        updatedProductSelection.price += optionData.price;
        updatedProductSelection.syrupAndSauces = tempSauceAndSyrup;
        updatedProductSelection.syrupAndSauces_quantity_selected =
          tempSauceAndSyrupQuantity;
      }
    } else {
      // you have to reduce it;
      if (tempSauceAndSyrupQuantity[optionIndex] == 0) return;
      let itemIndex = tempSauceAndSyrup.findIndex(
        (item) => item.type == optionData.type
      );
      if (itemIndex != -1) {
        tempSauceAndSyrup[itemIndex].quantity =
          tempSauceAndSyrupQuantity[optionIndex] - 1;
        tempSauceAndSyrupQuantity[optionIndex] -= 1;
        updatedProductSelection.price -= optionData.price;
        updatedProductSelection.syrupAndSauces = tempSauceAndSyrup;
        updatedProductSelection.syrupAndSauces_quantity_selected =
          tempSauceAndSyrupQuantity;
      }
    }
    setProductSelection(updatedProductSelection);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full w-full flex flex-col relative theamColor overflow-hidden">
        <div className="h-[70px] w-full centerDiv theamColor shrink-0 z-[8886]">
          <History />
        </div>
        <img
          src={product.productDetailsImage}
          alt="productImage"
          className="h-[510px] w-full object-cover"
        />
        {productSet.has(product.category) && (
          <div
            onClick={(event) => handleSlideAbove(event, 0)}
            className={`absolute z-[8888] bottom-[-410px] left-0 h-[650px] w-full cursor-pointer transition-transform duration-500  centerDiv rounded-t-[25px] ${
              slideAbove[0]
                ? "translate-y-[-350px] theamColor border-none"
                : "translate-y-0 bg-[#f1ebeb] border-[0.6px] border-gray-100"
            }`}
          >
            <div className="h-full w-full max-w-[1050px] flex flex-col">
              <div
                id="topSlideHeading"
                className={`text-[0.9rem] pl-3 h-[80px] w-full flex items-center addFont capitalize sm:pl-1 sm:text-[1.03rem] ${
                  slideAbove[0] == false ? `baseColor` : `text-white`
                } md:pl-[20px]`}
              >
                custome your order
              </div>

              <div className="h-[340px] w-full overflow-y-scroll flex flex-col">
                <div className="h-auto w-full flex flex-col shrink-0">
                  <div className="h-[60px] flex items-center w-full font-semibold text-white text-[1.1rem] uppercase tracking-wider pl-[10px] md:pl-[20px]">
                    size
                  </div>
                  <div className="h-[200px] w-full flex flex-row overflow-x-scroll">
                    {sizeOption.map((prodcutSize, index) => (
                      <div
                        key={"size" + index}
                        className="h-full w-[110px] flex flex-col shrink-0"
                      >
                        <div className="h-[90px] w-full centerDiv">
                          {index == productSelection.size_selected ? (
                            <img
                              src="http://res.cloudinary.com/djgouef8q/image/upload/v1726543387/uhq6ijn7ppnnvelmsmuz.png"
                              alt="cupImage"
                              className="h-[75px] w-[50px] bg-cover"
                            />
                          ) : (
                            <img
                              src="http://res.cloudinary.com/djgouef8q/image/upload/v1726543415/tuglosyzblslc6vg06yd.png"
                              alt="cupImage"
                              className="h-[75px] w-[50px] bg-cover"
                            />
                          )}
                        </div>
                        <div className="h-[60px] w-full centerDiv">
                          <span
                            onClick={() =>
                              updateProductSelection("size", prodcutSize, index)
                            }
                            className={`h-[35px] w-[90px] rounded-[18px] centerDiv border-[1px] border-white text-white text-[0.8rem] uppercase ${
                              productSelection.size_selected == index &&
                              `bg-[#116241]`
                            }`}
                          >
                            {prodcutSize.size}
                          </span>
                        </div>
                        <span className="h-[60px] w-full centerDiv text-[0.7rem] text-white">
                          {prodcutSize.desc} ₹ {prodcutSize.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="h-[1px] w-[98%] bg-white mt-[10px]" />
                <div className="h-auto w-full flex flex-col p-1 shrink-0">
                  <div className="h-[60px] flex items-center w-full font-semibold text-white text-[1.1rem] uppercase tracking-wider pl-[10px] md:pl-[20px]">
                    Milk
                  </div>
                  <div className="h-auto w-full flex gap-4 overflow-x-scroll pl-[10px] md:pl-[20px]">
                    {milkOption.map((option, index) => (
                      <div
                        key={"milk" + index}
                        className="h-auto w-auto min-w-[110px] flex flex-col"
                      >
                        <div className="h-[60px] w-full centerDiv">
                          <span
                            onClick={() =>
                              updateProductSelection("milk", option, index)
                            }
                            className={`h-[35px] w-full rounded-[18px] centerDiv border-[1px] border-white text-white text-[0.8rem] uppercase p-[20px] ${
                              productSelection.milk_selected == index &&
                              `bg-[#116241]`
                            }`}
                          >
                            {option.type}
                          </span>
                        </div>
                        <span className="h-[25px] w-full centerDiv text-[0.8rem] text-white">
                          ₹{option.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="h-[1px] w-[98%] bg-white mt-[20px]" />
                <div className="h-auto w-full flex flex-col p-1 shrink-0">
                  <div className="h-[60px] flex items-center w-full font-semibold text-white text-[1.1rem] uppercase tracking-wider pl-[10px] md:pl-[20px]">
                    choice of espresso
                  </div>
                  <div className="h-auto w-full flex gap-4 overflow-x-scroll pl-[10px] md:pl-[20px]">
                    {espressoOption.map((option, index) => (
                      <div
                        key={"espresso" + index}
                        className="h-auto w-auto min-w-[110px] flex flex-col"
                      >
                        <div className="h-[60px] w-full centerDiv">
                          <span
                            onClick={() =>
                              updateProductSelection("espresso", option, index)
                            }
                            className={`h-[35px] w-full rounded-[18px] centerDiv border-[1px] border-white text-white text-[0.8rem] uppercase p-[20px] ${
                              productSelection.espresso_selected == index &&
                              `bg-[#116241]`
                            }`}
                          >
                            {option.type}
                          </span>
                        </div>
                        <span className="h-[25px] w-full centerDiv text-[0.8rem] text-white">
                          ₹{option.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="h-[1px] w-[98%] bg-white mt-[10px]" />
                <div className="h-auto w-full flex flex-col p-1 shrink-0">
                  <div className="h-[60px] flex items-center w-full font-semibold text-white text-[1.1rem] uppercase tracking-wider pl-[10px] md:pl-[20px]">
                    Temperature
                  </div>
                  <div className="h-auto w-full flex gap-4 overflow-x-scroll pl-[10px] md:pl-[20px]">
                    {temperatureOption.map((option, index) => (
                      <div
                        key={"Temperature" + index}
                        className="h-auto w-auto min-w-[110px] flex flex-col"
                      >
                        <div className="h-[60px] w-full centerDiv">
                          <span
                            onClick={() =>
                              updateProductSelection(
                                "Temperature",
                                option,
                                index
                              )
                            }
                            className={`h-[35px] w-full rounded-[18px] centerDiv border-[1px] border-white text-white text-[0.8rem] uppercase pl-[20px] pr-[20px] ${
                              productSelection.temperature_selected == index &&
                              `bg-[#116241]`
                            }`}
                          >
                            {option.type}
                          </span>
                        </div>
                        <span className="h-[25px] w-full centerDiv text-[0.8rem] text-white">
                          ₹{option.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {productSet.has(product.category) && (
          <div
            onClick={(event) => handleSlideAbove(event, 1)}
            className={`absolute z-[8889] bottom-[-490px] left-0 h-[650px] w-full cursor-pointer transition-transform duration-500  rounded-md centerDiv ${
              slideAbove[1]
                ? "translate-y-[-350px] theamColor"
                : "translate-y-0 bg-[#f1ebeb]"
            }`}
          >
            <div className="h-full w-full max-w-[1050px] flex flex-col border-t-[1px] border-[#116241]">
              <div
                id="bottomSlideHeading"
                className={`text-[0.9rem] pl-3 h-[80px] w-full flex items-center addFont capitalize sm:pl-1 sm:text-[1.03rem] ${
                  slideAbove[1] == false ? `baseColor` : `text-white`
                } md:pl-[20px]`}
              >
                amp up our order wit add-on's
              </div>
              <div className="h-[340px] w-full overflow-y-scroll flex flex-col">
                <div className="h-auto w-full flex flex-col p-1 shrink-0">
                  <div className="h-[60px] flex items-center w-full font-semibold text-white text-[1.1rem] uppercase tracking-wider pl-[10px] md:pl-[20px]">
                    Whipped Topping
                  </div>
                  <div className="h-auto w-full flex gap-4 overflow-x-scroll pl-[10px] md:pl-[20px]">
                    {toppingOption.map((option, index) => (
                      <div
                        key={"whipped" + index}
                        className="h-auto w-auto min-w-[110px] flex flex-col"
                      >
                        <div className="h-[60px] w-full centerDiv">
                          <span
                            onClick={() =>
                              updateProductSelection(
                                "whippedTopping",
                                option,
                                index
                              )
                            }
                            className={`h-[35px] w-full rounded-[18px] centerDiv border-[1px] border-white text-white text-[0.8rem] uppercase p-[20px] ${
                              productSelection.whippedTopping_selected ==
                                index && `bg-[#116241]`
                            }`}
                          >
                            {option.type}
                          </span>
                        </div>
                        <span className="h-[25px] w-full centerDiv text-[0.8rem] text-white">
                          ₹{option.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="h-[1px] w-[98%] bg-white mt-[15px]" />
                <div className="h-auto w-full flex flex-col">
                  <div className="h-[60px] flex items-center w-full font-semibold text-white text-[1.1rem] uppercase tracking-wide pl-[10px] md:pl-[20px]">
                    Syrup & sauces
                  </div>
                  <div className="h-auto w-full flex flex-col pl-[10px] md:pl-[20px]">
                    {syrupAndSauceOption.map((option, index) => (
                      <div
                        key={"syrupAndSauces" + index}
                        className="h-[60px] w-full flex gap-1"
                      >
                        <div className="h-full w-[60%] flex flex-col md:w-[60%]">
                          <span className="h-[60%] w-full flex items-center text-[#f5f5f5] capitalize">
                            {option.type}
                          </span>
                          <span className="h-[40%] w-full flex items-center text-[#f5f5f5]">
                            {option.price}
                          </span>
                        </div>
                        <div className="h-full w-[40%] flex gap-1 items-center md:gap-4">
                          <CiCirclePlus
                            onClick={() =>
                              handleSauceAndSyrupQuantity(0, option, index)
                            }
                            className="text-[1.6rem] text-[#f5f5f5] shrink-0 md:text-[1.9rem]"
                          />
                          <span className="h-[50px] w-[50px] centerDiv text-[#f5f5f5] shrink-0">
                            {
                              productSelection.syrupAndSauces_quantity_selected[
                                index
                              ]
                            }
                          </span>
                          <CiCircleMinus
                            onClick={() =>
                              handleSauceAndSyrupQuantity(1, option, index)
                            }
                            className="text-[1.6rem] text-[#f5f5f5] shrink-0 md:text-[1.9rem]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute z-[8890] bottom-[-2px] left-0 h-[80px] w-full bg-[#116241] centerDiv">
          <div className="h-full w-full max-w-[1050px] flex justify-between">
            <span className="h-full w-auto text-white centerDiv pl-3 md:pl-[30px]">
              ₹ {productSelection.price}
            </span>
            <div className="h-full w-[110px] centerDiv pr-3">
              <button className="h-[35px] w-[100px] bg-[#f4f4f4] baseColor rounded-[20px] text-[0.8rem] addFont">
                Add Item
              </button>
            </div>
          </div>
        </div>

        <div className="absolute left-[2%] top-[15%] centerDiv md:top-[40%] xl:left-[12%]">
          <div className="h-auto min-h-[150px] w-[300px] flex flex-col bg-gradient-to-b from-transparent to-black max-w-[1050px] md:w-[95%]">
            <div className="h-auto w-[300px] flex flex-col gap-2 items-center md:flex-row md:w-[450px]">
              {product.productType != null && product.productType == "Veg" ? (
                <div className="h-auto w-full flex pt-1 pl-2 gap-2 md:h-full md:w-auto">
                  <img
                    src="http://res.cloudinary.com/djgouef8q/image/upload/v1725956565/evqd7oumunkyq2xmejzm.png"
                    alt="vegImage"
                    className="h-[25px] w-[25px] bg-cover"
                  />
                  <span className="text-[#f4f4f4] uppercase text-[0.9rem]">
                    Vegetarian
                  </span>
                </div>
              ) : (
                <div className="h-full w-full flex items-center gap-1">
                  <img
                    src="http://res.cloudinary.com/djgouef8q/image/upload/v1725956639/apauehqqciemydmaguit.png"
                    alt="NonImage"
                    className="h-[25px] w-[25px] bg-cover"
                  />
                  <span className="text-[#f4f4f4] uppercase text-[0.9rem]">
                    Non-Vegetarian
                  </span>
                </div>
              )}
              <div className="h-auto p-1 w-full text-[#f4f4f4] flex items-center uppercase text-[0.9rem] md:flex-1 md:h-full">
                {product.productInfo}
              </div>
            </div>
            <div className="h-auto w-full p-2 text-[#f4f4f4] text-[2rem] addFont font-extrabold">
              {product.name}
            </div>
            <div className="h-auto w-full p-1 text-[#f4f4f4] text-[0.9rem]">
              {product.productDetails}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
