import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { OrderHistory } from "../Components/OrderHistory";
import { fetchUserOrderHistory } from "../utils/api";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";

jest.mock("../utils/api");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Order History Component Test For No Order", () => {
  const orderMockResolvedValue = {
    orders: [],
    totalOrder: 0,
  };
  beforeEach(() => {
    fetchUserOrderHistory.mockResolvedValue({
      success: true,
      data: orderMockResolvedValue,
    });
    useSelector.mockReturnValue({
      token: "mock-token",
      history: ["Home", "Order History"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Order History Empty", async () => {
    render(
      <Provider store={store}>
        <OrderHistory />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/you don't have any order yet/i)
      ).toBeInTheDocument();
    });
  });
});

describe("Order History Component Test With Orders", () => {
  const orderMockResolvedValue = {
    orders: [
      {
        _id: "6708912d85b09c34ec3bab44",
        orderId: 1,
        userId: "66d2a1ffa885c553d06f567d",
        products: [
          {
            _id: "66ffd02a1b2fbe32ac91e025",
            userId: "66d2a1ffa885c553d06f567d",
            productId: {
              _id: "66c31de042624a9ad21020bd",
              name: "Stardust Macchiato",
              productInfo: "SHORT(Short Stardust Macchiato)",
              productDetails:
                "Super smooth and creamy vanilla half and half crowned with sweet and subtle cold foam, marked with an intense ristretto shot and cocoa dust",
              category: "Drinks",
              price: 414.75,
              productCartImage:
                "http://res.cloudinary.com/djgouef8q/image/upload/v1723956399/dw1w9sobw6cx2hecpzk8.jpg",
              productDetailsImage:
                "http://res.cloudinary.com/djgouef8q/image/upload/v1723956421/maaclqnvqefetwmosh3m.jpg",
              productType: "Veg",
              __v: 0,
            },
            amount: 414.75,
            size: "Short",
            milk: "No Milk",
            espresso: "Indian Espresso Roast (Default)",
            temperature: "Normal Hot",
            whippedTopping: "No whipped Topping",
            syrupAndSauces: [],
            __v: 0,
          },
          {
            _id: "67077a71d1802a4fe4b7567a",
            userId: "66d2a1ffa885c553d06f567d",
            productId: {
              _id: "66c31de042624a9ad21020bc",
              name: "cold coffee",
              productInfo: "TALL(354 ML) .354 kcal",
              productDetails:
                "Our signature rich in flavour espresso blended with delicate vanilla flavour and milk to create a perfect cold coffee delight. An all time favourite. Allergen-Contains Milk, Tall: 354 ML, 354 kcal, Grande: 473 ML, 473 kcal, Venti: 591 ML, 501 kcal.An average active adult requires 2000 kcal energy per day, however, calorie needs may vary",
              category: "Bestseller",
              price: 283.5,
              productCartImage:
                "http://res.cloudinary.com/djgouef8q/image/upload/v1723955959/o7aepu4j0xc2brsic0om.webp",
              productDetailsImage:
                "http://res.cloudinary.com/djgouef8q/image/upload/v1723955936/t8xafu6kv5xtwvchj25z.jpg",
              productType: "Veg",
              __v: 0,
            },
            amount: 283.5,
            size: "Short",
            milk: "No Milk",
            espresso: "Indian Espresso Roast (Default)",
            temperature: "Normal Hot",
            whippedTopping: "No whipped Topping",
            syrupAndSauces: [],
            __v: 0,
          },
          {
            _id: "67077a80d1802a4fe4b75688",
            userId: "66d2a1ffa885c553d06f567d",
            productId: {
              _id: "66c31de042624a9ad21020c0",
              name: "Mushroom Cheese Melt Baguette Sandwich",
              productInfo: "210g/541kcal",
              productDetails:
                "Hearty mushrooms topped with melted yellow cheddar cheese in a herbed aioli garnished with chopped parsley served in a baguette",
              category: "Food",
              price: 462,
              productCartImage:
                "http://res.cloudinary.com/djgouef8q/image/upload/v1723956991/soewojbbr0jujhr5okce.jpg",
              productDetailsImage:
                "http://res.cloudinary.com/djgouef8q/image/upload/v1723956953/sal7dmpuesy2pknbmoc8.jpg",
              productType: "Veg",
              __v: 0,
            },
            amount: 462,
            size: "Short",
            milk: "No Milk",
            espresso: "Indian Espresso Roast (Default)",
            temperature: "Normal Hot",
            whippedTopping: "No whipped Topping",
            syrupAndSauces: [],
            __v: 0,
          },
        ],
        takeAwayFrom: "Shop 8, Orion Mall, Dr. Rajkumar Road, Bangalore",
        amount: 1218.26,
        paymentMethod: "Payment Gateway",
        additionalMessage: "",
        __v: 0,
        updatedAt: "2024-10-14T01:49:46.016Z",
      },
    ],
    totalOrder: 1,
  };
  beforeEach(() => {
    fetchUserOrderHistory.mockResolvedValue({
      success: true,
      data: orderMockResolvedValue,
    });
    useSelector.mockReturnValue({
      token: "mock-token",
      history: ["Home", "Order History"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Order History Empty", async () => {
    render(
      <Provider store={store}>
        <OrderHistory />
      </Provider>
    );

    await waitFor(async () => {
      expect(screen.getAllByText(/Stardust Macchiato/i)[0]).toBeInTheDocument();
      const viewDetailsButton = screen.getByTestId("ohViewDetailsTest");
      await userEvent.click(viewDetailsButton);
      expect(
        screen.getAllByText(
          /Shop 8, Orion Mall, Dr. Rajkumar Road, Bangalore/i
        )[0]
      ).toBeInTheDocument();
    });
  });
});
