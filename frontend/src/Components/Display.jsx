import React, { useEffect, useState } from "react";
import { handcraftedData, products } from "../utils/DisplayData";
import { Contact } from "./Contact";
import { fetchBestSellingProducts } from "../utils/api";
import { ToastContainer } from "react-toastify";
import { showErrorNotification } from "../utils/notification";

import Slider from "react-slick";
//#edebe9
//http://res.cloudinary.com/djgouef8q/image/upload/v1724383231/kofsfd2k9puxunklexup.png
//add item #16754a
//bg-[#edebe9]
export const Display = () => {
  const bestProductSliderSettingWider = {
    className: "center",
    infinite: true,
    speed: 500,
    slidesToShow: 2.15,
    slidesToScroll: 1,
  };
  const bestProductSliderSettingSmaller = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [bestSellingProducts, setBestSellingProducts] = useState(products);

  //   useEffect(() => {
  //     const fetchDisplayData = async () => {
  //       const response = await fetchBestSellingProducts();
  //       if (response.success) {
  //         console.log(response.data);
  //         setBestSellingProducts(response.data);
  //       } else {
  //         showErrorNotification("Something went wrong while fetching data");
  //       }
  //     };
  //     fetchDisplayData();
  //   }, []);
  //todo : here we need to navigate to cofee making info

  return (
    <div className="h-full w-full flex flex-col overflow-y-scroll">
      <div className="h-[70px] w-full theamColor centerDiv flex-shrink-0">
        <div className="h-full w-full max-w-[1050px] flex justify-between items-center">
          <span className="text-[#f4f4f4] ml-[20px] text-[0.98rem]">
            Beans And Bite
          </span>

          <span className="h-[35px] w-[100px] border-[1px] border-white text-[#f4f4f4] text-[0.8rem] centerDiv rounded-lg mr-[20px]">
            Know More
          </span>
        </div>
      </div>
      <div className="h-auto w-full centerDiv">
        <div className="h-auto w-full max-w-[1050px] p-2 flex flex-col">
          <div className="h-[50px] w-full flex items-center pl-[25px] addFont text-[1.12rem] text-green-950">
            Handcrafted Curations
          </div>
          <div className="h-auto w-full flex flex-wrap justify-around">
            {handcraftedData.map((data, index) => (
              <div
                key={`${index}-bestselling`}
                className="h-[150px] w-[140px] flex flex-col centerDiv gap-3 rounded-lg shadow-lg bg-[#f4f4f4]"
              >
                <img
                  src={data.url}
                  alt="bestseller image"
                  className="h-[90px] w-[90px] bg-cover rounded-[50%]"
                />
                <span className="h-[30px] w-full centerDiv text-[0.8rem]">
                  {data.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[340px] w-full bg-[#edebe9] mt-[10px] centerDiv relative sm:h-[350px] ">
        <img
          src="http://res.cloudinary.com/djgouef8q/image/upload/v1724383231/kofsfd2k9puxunklexup.png"
          alt="flower"
          className="absolute right-[20px] top-0 h-[80px] w-[80px] bg-cover"
        />
        <div className="h-full w-full centerDiv flex flex-col gap-4  max-w-[1050px]">
          <div className="h-[50px] w-full flex items-center pl-[25px] addFont text-[1.12rem] text-green-950">
            Bestseller Recommends
          </div>
          <div className="hide sm:block h-[250px] w-[95%]">
            <Slider {...bestProductSliderSettingWider}>
              {bestSellingProducts &&
                bestSellingProducts.map((product, index) => (
                  <div
                    key={`${index}-wide-${product._id}`}
                    className="h-auto w-full max-w-[400px] flex items-center bg-[#edebe9]"
                  >
                    <div className="h-[180px] w-[380px] bg-[#f4f4f4] rounded-lg">
                      <div className="h-[70%] w-full flex items-center gap-2 justify-evenly">
                        <div className="h-full w-[120px] centerDiv">
                          <div className="h-[90%] w-[90%] centerDiv">
                            <img
                              src={product.productCartImage}
                              alt="product_image"
                              className="h-full w-full bg-cover rounded-md"
                            />
                          </div>
                        </div>
                        <div className="h-full w-[240px] flex flex-col gap-2">
                          <span className="h-auto w-full addFont mt-2 ml-2">
                            {product.name}
                          </span>
                          <span className="h-auto w-full mt-1 ml-2 opacity-[70%] text-[0.9rem]">
                            {product.productInfo}
                          </span>
                        </div>
                      </div>
                      <div className="h-[30%] w-full flex items-center">
                        <span className="ml-[30px] w-[150px] addFont text-[0.98rem]">
                          ₹ 309.75
                        </span>
                        <button className="h-[30px] w-[90px] bg-[#16754a] text-[white] rounded-[20px] text-[0.8rem] addFont mr-[30px]">
                          Add Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
          <div className="h-[200px] w-[95%] sm:hidden">
            <Slider {...bestProductSliderSettingSmaller}>
              {bestSellingProducts &&
                bestSellingProducts.map((product, index) => (
                  <div
                    key={`${index}-small-${product._id}`}
                    className="h-auto w-[300px] flex bg-[#f4f4f4] rounded-lg"
                  >
                    <div className="h-[150px] w-full flex p-2 items-center centerDiv">
                      <div className="h-full w-[150px] flex items-center">
                        <img
                          src={product.productCartImage}
                          alt="productImage"
                          className="h-[130px] w-[130px] bg-cover rounded-md"
                        />
                      </div>
                      <div className="h-full w-[45%] flex flex-col gap-2">
                        <div className="h-auto w-full flex flex-col">
                          <span className="h-auto w-full addFont p-1 truncate">
                            {product.name}
                          </span>
                          <span className="h-auto w-full opacity-[70%] text-[0.9rem] p-1 truncate">
                            {product.productInfo}
                          </span>
                        </div>
                        <div className="h-[70px] w-full flex">
                          <span className="h-full w-[130px] addFont text-[0.98rem] centerDiv">
                            ₹ {product.price}
                          </span>
                          <span className=" h-auto w-full flex items-center ml-1">
                            <button className=" h-[30px] w-[90px] bg-[#16754a] text-[white] rounded-[20px] text-[0.8rem] addFont ">
                              Add Item
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="h-auto w-full centerDiv bg-[#edebe9] mt-[30px]">
        <div className="h-auto w-full max-w-[1050px] flex flex-col bg-[#edebe9] gap-2 p-1">
          <div className="h-[50px] w-full flex items-center addFont ml-[10px] text-green-950">
            Learn more about the world of coffee!
          </div>
          <div className="h-[372px] w-full centerDiv relative">
            <img
              src="http://res.cloudinary.com/djgouef8q/image/upload/v1724472065/fylfg29273jqhurwsewr.jpg"
              alt="coffeeImage"
              className="h-full w-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-80 left-0 h-auto w-full flex flex-col">
              <div className="h-auto w-auto flex flex-col">
                <span className="h-[50px] w-auto flex items-center ml-3 mt-2 addFont text-[1.3rem] text-white font-extrabold">
                  Art & Science Of Coffee Brewing
                </span>
                <span className="h-[30px] w-auto opacity-[80%] text-[0.9rem] text-white ml-3">
                  Master the perfect brew with beans and bite! Learn the are of
                  science of coffee brewing
                </span>
              </div>
              <div className="h-[80px] w-auto flex flex-col-reverse ml-3">
                <button className="h-[40px] w-[190px] bg-[#f4f4f4] rounded-[30px] addFont text-[0.86rem]">
                  Learn more
                </button>
              </div>
              <div className="h-[30px] w-full"></div>
            </div>
          </div>
        </div>
      </div>
      <Contact />

      <ToastContainer />
    </div>
  );
};
