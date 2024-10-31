import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Account } from "../Components/Account";
import { fetchUserDetails } from "../utils/api";

jest.mock("../utils/api");

describe("Account Component Test", () => {
  const mockUserDetails = {
    _id: "66d2a1ffa885c553d06f567d",
    name: "John Doe",
    email: "devbakare00@gmail.com",
    mobileNumber: "9087654321",
    password: "$2b$10$FXMfE0l5cDawJ/pmXDa50enSkKwr54q2r3JTHDQv6IEcF45TdWsrq",
    favourites: [],
    cart: ["670dd59e061ded838d63018f"],
    orders: [
      "6708912d85b09c34ec3bab44",
      "670895aa929372327f64a88c",
      "670897cbe949ffe9b5350017",
      "6708add322b5c59275d0f6dd",
      "6708b47563b5fa3764a32366",
      "670c74cb192d6d380b32781b",
    ],
    __v: 0,
    gifts: [
      {
        status: "sent",
        giftId: "6704a38c6f9d3c93b7fe8f83",
        _id: "6704a38c6f9d3c93b7fe8f85",
      },
      {
        status: "sent",
        giftId: "6704a481d172c838977f3f91",
        _id: "6704a481d172c838977f3f93",
      },
      {
        status: "sent",
        giftId: "6704a5f71e065ff838ad8660",
        _id: "6704a5f71e065ff838ad8662",
      },
      {
        status: "sent",
        giftId: "6704be9cf82116c93e621a2b",
        _id: "6704be9cf82116c93e621a2d",
      },
      {
        status: "sent",
        giftId: "6704f1ee0020f685cec71270",
        _id: "6704f1ee0020f685cec71272",
      },
      {
        status: "sent",
        giftId: "6704f41c0020f685cec71298",
        _id: "6704f41c0020f685cec7129a",
      },
      {
        status: "sent",
        giftId: "6704f4ea0020f685cec712c6",
        _id: "6704f4ea0020f685cec712c8",
      },
    ],
    wallet: 334.98,
  };

  beforeEach(() => {
    fetchUserDetails.mockResolvedValue({
      success: true,
      data: mockUserDetails,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Testing Account Component redering", async () => {
    render(
      <Provider store={store}>
        <Account />
      </Provider>
    );

    const user = userEvent.setup();

    expect(
      screen.getByText(/we are processing your request please wait/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      const userNameText = screen.getByText(/John Doe/i);
      expect(userNameText).toBeInTheDocument();

      const giftSection = screen.getByText(/Gift/i);
      expect(giftSection).toBeInTheDocument();

      const walletSection = screen.getByText(/Wallet/i);
      expect(walletSection).toBeInTheDocument();

      const cartSection = screen.getByText(/Cart/i);
      expect(cartSection).toBeInTheDocument();

      const favouriteSection = screen.getByText(/Favourites/i);
      expect(favouriteSection).toBeInTheDocument();

      const editProfileSection = screen.getByText(/Edit Profile/i);
      expect(editProfileSection).toBeInTheDocument();

      const logoutSection = screen.getByText(/Logout/i);
      expect(logoutSection).toBeInTheDocument();
    });
  });
});