import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ProductOrder } from "../Components/ProductOrder";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";

jest.mock("../utils/api");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Product Order Component Test", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      product: {
        _id: "66c31de042624a9ad21020bf",
        name: "Sriracha Chicken Sourdough Sandwich",
        productInfo: "185gm/521kcal",
        productDetails:
          "Spicy and tangy Sriracha grilled chicken shreds with the added heat of bhoot jholokia chillies on a bed of toasted sourdough bread, With a generous sprinkle of black and white toasted sesame seeds,garnished with fresh cilantro leaves. Read Less",
        category: "Food",
        price: 430.5,
        productCartImage:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1723956975/yyfvwsc0gqp2tgzhvinq.jpg",
        productDetailsImage:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1723956937/h0iyjmagw4wqgwpyqjt8.jpg",
        productType: "Non-Veg",
        __v: 0,
      },
      customizationDetails: null,
      token: "mock-token",
      isAuthenticated: true,
      cartError: null,
      favoriteError: null,
      favorites: [],
      history: ["Home", "Sriracha Chicken Sourdough Sandwich"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Testing Product Order Component Rendering", () => {
    render(
      <Provider store={store}>
        <ProductOrder />
      </Provider>
    );

    expect(
      screen.getAllByText(/Sriracha Chicken Sourdough Sandwich/i)[0]
    ).toBeInTheDocument();
  });

  test("Testing Order Component rendering with cart customization details", async () => {
    useSelector.mockReturnValue({
      product: {
        _id: "66c31de042624a9ad21020be",
        name: "Caramel Macchiato",
        productInfo: "SHORT(237 ML). 162 kcal",
        productDetails:
          "Freshly steamed milk with vanilla-flavored syrup is marked with espresso and topped with caramel drizzle.",
        category: "Drinks",
        price: 325.5,
        productCartImage:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1723956443/tw76nhhqu6vwzvp4t3hb.webp",
        productDetailsImage:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1723956466/svwnzyhdsypltpyqgiat.jpg",
        productType: "Veg",
        __v: 0,
      },
      customizationDetails: {
        cartId: "6711d47faa3f9de1ec879223",
        espresso: "Indian Espresso Roast (Default)",
        milk: "Skimmed Milk",
        price: 388.05,
        size: "Tall",
        syrupAndSauces: [],
        temperature: "Normal Hot",
        whippedTopping: "No whipped Topping",
      },
      token: "mock-token",
      isAuthenticated: true,
      cartError: null,
      favoriteError: null,
      favorites: [],
      history: ["Home", "Sriracha Chicken Sourdough Sandwich"],
    });

    render(
      <Provider store={store}>
        <ProductOrder />
      </Provider>
    );

    expect(
      screen.getAllByText(/Sriracha Chicken Sourdough Sandwich/i)[0]
    ).toBeInTheDocument();

    const customOrder = screen.getByTestId("customTest");
    await userEvent.click(customOrder);
    const sizeTall = screen.getAllByText(/Tall/i)[0];
    expect(sizeTall).toHaveClass("bg-[#116241]");
  });

  test("Check Favourite", async () => {
    useSelector.mockReturnValue({
      product: {
        _id: "66c31de042624a9ad21020be",
        name: "Caramel Macchiato",
        productInfo: "SHORT(237 ML). 162 kcal",
        productDetails:
          "Freshly steamed milk with vanilla-flavored syrup is marked with espresso and topped with caramel drizzle.",
        category: "Drinks",
        price: 325.5,
        productCartImage:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1723956443/tw76nhhqu6vwzvp4t3hb.webp",
        productDetailsImage:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1723956466/svwnzyhdsypltpyqgiat.jpg",
        productType: "Veg",
        __v: 0,
      },
      customizationDetails: {
        cartId: "6711d47faa3f9de1ec879223",
        espresso: "Indian Espresso Roast (Default)",
        milk: "Skimmed Milk",
        price: 388.05,
        size: "Tall",
        syrupAndSauces: [],
        temperature: "Normal Hot",
        whippedTopping: "No whipped Topping",
      },
      token: "mock-token",
      isAuthenticated: true,
      cartError: null,
      favoriteError: null,
      favorites: ["66c31de042624a9ad21020be"],
      history: ["Home", "Sriracha Chicken Sourdough Sandwich"],
    });

    render(
      <Provider store={store}>
        <ProductOrder />
      </Provider>
    );

    expect(
      screen.getAllByText(/Sriracha Chicken Sourdough Sandwich/i)[0]
    ).toBeInTheDocument();

    const notFavItem = screen.queryByTestId("notFavTest");
    expect(notFavItem).not.toBeInTheDocument();

    const favItem = screen.getByTestId("favTest");
    expect(favItem).toBeInTheDocument();
  });
});
