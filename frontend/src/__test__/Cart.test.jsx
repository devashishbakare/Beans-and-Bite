import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { UserCart } from "../Components/UserCart";
import { fetchProductFromCart } from "../utils/api";
import { useSelector } from "react-redux";

jest.mock("../utils/api");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Cart Component Test", () => {
  const mockCartDetails = [
    {
      _id: "670dd59e061ded838d63018f",
      userId: "66d2a1ffa885c553d06f567d",
      productId: {
        _id: "66c31de042624a9ad21020c4",
        name: "Via-Italian Roast",
        productDetails:
          "Now you can enjoy our bold and roasty-sweet Italian Roast in an instant. Just tear open a pack of Starbucks VIA® Ready Brew and add water. Let the coffee brew 10 seconds, stir, savor and enjoy",
        category: "Coffee At Home",
        price: 650,
        productCartImage:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1724035655/mkpaehgvls2zv2fxh2lk.jpg",
        productDetailsImage:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1724035674/fzur3kovfbaffgnkbl6w.jpg",
        productType: "Veg",
        __v: 0,
      },
      amount: 650,
      size: "Short",
      milk: "No Milk",
      espresso: "Indian Espresso Roast (Default)",
      temperature: "Normal Hot",
      whippedTopping: "No whipped Topping",
      syrupAndSauces: [],
      __v: 0,
    },
  ];

  const cartProductQuantity = {
    "670dd59e061ded838d63018f": 1,
  };

  beforeEach(() => {
    fetchProductFromCart.mockResolvedValue({
      success: true,
      data: mockCartDetails,
    });
    useSelector.mockReturnValue({
      isAuthenticated: true,
      token: "mock-token",
      cartProductWithQuantity: cartProductQuantity,
      cartPrice: 650,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Testing Cart Component Details", async () => {
    render(
      <Provider store={store}>
        <UserCart />
      </Provider>
    );

    expect(
      screen.getByText(/we are processing your request please wait/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      const cartHeadingName = screen.getAllByText(/Cart/i);
      expect(cartHeadingName[0]).toBeInTheDocument();

      const cartProductName = screen.getByText(/Via-Italian Roast/i);
      expect(cartProductName).toBeInTheDocument();

      const cartProductAmount = screen.getByText(/650.00/i);
      expect(cartProductAmount).toBeInTheDocument();

      const cartProceedButton = screen.getByText(/proceed for order/i);
      expect(cartProceedButton).toBeInTheDocument();
    });
  });
});
