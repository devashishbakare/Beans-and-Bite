import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MobileSearch } from "./MobileSearch";
import { Display } from "./Display";
import { Order } from "./Order";
import { ProductOrder } from "./ProductOrder";
import { UserCart } from "./UserCart";
import { Favourite } from "./Favourite";
export const Content = () => {
  //todo : update this with the redux slice
  // const { selectedOption, updateSelection } = useUpdateSelection();
  const { navbarOpationSelection } = useSelector(
    (state) => state.navbarSelection
  );
  return (
    <div className="h-full w-full">
      {navbarOpationSelection == "Home" && (
        <div className="h-full w-full">
          <Display />
        </div>
      )}
      {navbarOpationSelection == "mobileSearch" && (
        <div className="h-full w-full">
          <MobileSearch />
        </div>
      )}
      {navbarOpationSelection == "Order" && (
        <div className="h-full w-full">
          <Order />
        </div>
      )}
      {navbarOpationSelection == "productOrder" && (
        <div className="h-full w-full">
          <ProductOrder />
        </div>
      )}
      {navbarOpationSelection == "cart" && (
        <div className="h-full w-full">
          <UserCart />
        </div>
      )}
      {navbarOpationSelection == "favourite" && (
        <div className="h-full w-full">
          <Favourite />
        </div>
      )}
    </div>
  );
};
