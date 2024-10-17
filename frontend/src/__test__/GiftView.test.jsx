import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { GiftView } from "../Components/GiftView";
import { useSelector } from "react-redux";

jest.mock("../utils/api");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Gift View Component Testing", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      extraData: {
        id: "anyTime-0",
        title: "My Treat",
        desc: "nothing like cup of coffee to flame a friendship, share the experiece with your best friend",
        image:
          "http://res.cloudinary.com/djgouef8q/image/upload/v1728117402/xz9drtijg95zvj7bp5jz.png",
      },
      wallet: 1000,
      isAuthenticated: true,
      token: "mock-token",
      history: ["Home", "Gift", "Gift View"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Check Rendering Of Gift View", async () => {
    render(
      <Provider store={store}>
        <GiftView />
      </Provider>
    );

    expect(screen.getByText(/My Treat/i)).toBeInTheDocument();

    const amountSection = screen.getByTestId("giftViewAmount");
    expect(amountSection).toBeInTheDocument();
    await userEvent.type(amountSection, "300");
    expect(amountSection).toHaveValue(300);

    const recipientName = screen.getByTestId("giftViewRecipientName");
    expect(recipientName).toBeInTheDocument();
    await userEvent.type(recipientName, "Devashish Bakare");
    expect(recipientName).toHaveValue("Devashish Bakare");

    const emailId = screen.getByTestId("giftViewRecipientEmailId");
    expect(emailId).toBeInTheDocument();
    await userEvent.type(emailId, "devbakare00@gmail.com");
    expect(emailId).toHaveValue("devbakare00@gmail.com");

    const mobileNumber = screen.getByTestId("giftViewRecipientMobileNumber");
    expect(mobileNumber).toBeInTheDocument();
    await userEvent.type(mobileNumber, "9876543211");
    expect(mobileNumber).toHaveValue("9876543211");

    const senderName = screen.getByTestId("giftViewSenderName");
    expect(senderName).toBeInTheDocument();
    await userEvent.type(senderName, "John Doe");
    expect(senderName).toHaveValue("John Doe");

    const senderMobileNumber = screen.getByTestId("giftViewSenderMobileNumber");
    expect(senderMobileNumber).toBeInTheDocument();
    await userEvent.type(senderMobileNumber, "9876543211");
    expect(senderMobileNumber).toHaveValue("9876543211");

    const message = screen.getByTestId("giftViewMessage");
    expect(message).toBeInTheDocument();
    await userEvent.type(message, "some text here");
    expect(message).toHaveValue("some text here");

    const makePaymentButton = screen.getByTestId("giftViewMakePayment");
    expect(makePaymentButton).toBeInTheDocument();

    await userEvent.click(makePaymentButton);
    await waitFor(() => {
      expect(
        screen.getByText(/Choose your preferred payment method/i)
      ).toBeInTheDocument();
    });
  });
});
