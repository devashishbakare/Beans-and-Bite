import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ConfirmOrder } from "../Components/ConfirmOrder";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";
import { fetchProductFromCart } from "../utils/api";

jest.mock("../utils/api");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Confirm Order Component Test", () => {
  beforeEach(() => {
    fetchProductFromCart.mockResolvedValue({
      success: true,
      data: [
        {
          _id: "6711d47faa3f9de1ec879223",
          userId: "66d2a1ffa885c553d06f567d",
          productId: {
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
          amount: 388.05,
          size: "Tall",
          milk: "Skimmed Milk",
          espresso: "Indian Espresso Roast (Default)",
          temperature: "Normal Hot",
          whippedTopping: "No whipped Topping",
          syrupAndSauces: [],
          __v: 0,
        },
      ],
    });
    useSelector.mockReturnValue({
      token: "mock-token",
      wallet: 1000,
      history: ["Home", "Cart", "Confirm Order"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Confirm Order Component Rendering and functioning test", async () => {
    render(
      <Provider store={store}>
        <ConfirmOrder />
      </Provider>
    );

    await waitFor(async () => {
      //checkin rendering here
      expect(screen.getByText(/Take-away from/i)).toBeInTheDocument();
      // checking API data
      expect(screen.getByText(/Caramel Macchiato/i)).toBeInTheDocument();
      await userEvent.click(screen.getByTestId("selectCityTest"));
      await userEvent.click(screen.getByText(/Select City/i));
      await userEvent.click(screen.getAllByText(/Pune/i)[0]);
      await userEvent.click(screen.getByTestId("radio-4"));
      await userEvent.click(screen.getByTestId("placeOrderTest"));
      expect(
        screen.getByText(/Choose your preferred payment method/i)
      ).toBeInTheDocument();
    });
  });
});
