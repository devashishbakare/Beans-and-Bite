import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { GiftHistory } from "../Components/GiftHistory";
import { fetchUserGiftHistory } from "../utils/api";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";

jest.mock("../utils/api");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Gift History Component Test For No Gift", () => {
  const historyMockResolvedValue = {
    giftDetails: [],
    totalGifts: 0,
  };
  beforeEach(() => {
    fetchUserGiftHistory.mockResolvedValue({
      success: true,
      data: historyMockResolvedValue,
    });
    useSelector.mockReturnValue({
      token: "mock-token",
      history: ["Home", "Gift History"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Gift History Empty", async () => {
    render(
      <Provider store={store}>
        <GiftHistory />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/You haven't sent or received any gifts yet./i)
      ).toBeInTheDocument();
    });
  });
});

describe("Gift History Component With Gift History", () => {
  const giftMockResolvedValue = {
    giftDetails: [
      {
        status: "sent",
        giftCardDetails: {
          _id: "6704a38c6f9d3c93b7fe8f83",
          name: "My Treat",
          amount: 200,
          recipientName: "devashish bakare",
          recipientMobileNumber: "7774816727",
          recipientEmailAddress: "darknet311298@gmail.com",
          senderName: "John Doe",
          senderMobileNumber: "9087654321",
          senderEmailAddress: "devbakare00@gmail.com",
          senderMessage: "have it brother, you earn it",
          __v: 0,
          giftCardImage:
            "http://res.cloudinary.com/djgouef8q/image/upload/v1728117402/xz9drtijg95zvj7bp5jz.png",
        },
      },
    ],
    totalGifts: 1,
  };
  beforeEach(() => {
    fetchUserGiftHistory.mockResolvedValue({
      success: true,
      data: giftMockResolvedValue,
    });
    useSelector.mockReturnValue({
      token: "mock-token",
      history: ["Home", "Order History"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Order History With Gifts", async () => {
    render(
      <Provider store={store}>
        <GiftHistory />
      </Provider>
    );

    await waitFor(async () => {
      expect(screen.getAllByText(/My Treat/i)[0]).toBeInTheDocument();
    });
  });
});
