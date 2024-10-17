import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Favourite } from "../Components/Favourite";
import { fetchFavouritesProduct } from "../utils/api";
import { useSelector } from "react-redux";

jest.mock("../utils/api");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Favourite Component Test1", () => {
  beforeEach(() => {
    fetchFavouritesProduct.mockResolvedValue({
      success: true,
      data: [],
    });
    useSelector.mockReturnValue({
      isAuthenticated: true,
      token: "mock-token",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Testing Favourite Component No Item Present", async () => {
    render(
      <Provider store={store}>
        <Favourite />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/Favourites/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/No item in favourites/i)).toBeInTheDocument();
    });
  });
});

describe("Favourite Component Test1", () => {
  const favouriteMockValue = [
    {
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
  ];

  beforeEach(() => {
    fetchFavouritesProduct.mockResolvedValue({
      success: true,
      data: favouriteMockValue,
    });
    useSelector.mockReturnValue({
      isAuthenticated: true,
      token: "mock-token",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("check favourite items", async () => {
    render(
      <Provider store={store}>
        <Favourite />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Caramel Macchiato/i)).toBeInTheDocument();
      expect(screen.getByText(/Add Item/i)).toBeInTheDocument();
    });
  });
});
