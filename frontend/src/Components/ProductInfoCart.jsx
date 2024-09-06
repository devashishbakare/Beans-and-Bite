import React from "react";
import propTypes from "prop-types";

export const ProductInfoCart = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <div
          key={product._id + "productCartInfo"}
          className="h-[250px] w-[350px] flex addShadow rounded-md"
        >
          <div className="h-full w-[35%] flex justify-center">
            <img
              src={product.productCartImage}
              alt="productImage"
              className="h-[110px] w-[110px] bg-cover rounded-[50%] mt-[20px] border-[0.7px] border-gray-300"
            />
          </div>
          <div className="h-full w-[65%] flex flex-col justify-between pl-2">
            <div className="flex-1 max-h-[220px] w-full flex flex-col">
              <div className="h-auto w-full overflow-hidden flex items-center p-1 addFont mt-[10px]">
                {product.name}
              </div>

              <div className="h-auto w-full opacity-[70%] text-[0.9rem] p-1 overflow-hidden">
                {product.productInfo}
              </div>
              <div className="h-[72px] w-full opacity-[70%] text-[0.9rem] p-1 overflow-hidden text-ellipsis line-clamp-3">
                {product.productDetails}
              </div>
            </div>
            <div className="h-[70px] w-full flex items-center">
              <span className="h-full w-[40%] addFont text-[0.98rem] flex items-center">
                ₹ {product.price}
              </span>
              <span className="h-full w-[60%] flex items-center">
                <button className="h-[35px] w-[90px] bg-[#16754a] text-[white] rounded-[20px] text-[0.8rem] addFont">
                  Add Item
                </button>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

ProductInfoCart.propTypes = {
  products: propTypes.array,
};
