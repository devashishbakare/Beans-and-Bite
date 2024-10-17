import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Account } from "../Components/Account";

import { fetchUserDetails } from "../utils/api";

jest.mock("../utils/api");

describe("Edit Profile test", () => {
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

  test("Testing Edit Profile modal", async () => {
    render(
      <Provider store={store}>
        <Account />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/we are processing your request please wait/i)
      ).toBeInTheDocument();
    });

    const user = userEvent.setup();
    const editProfileDiv = screen.getByTestId("editProfileDiv");
    await user.click(editProfileDiv);

    const userNameText = screen.getByText(/Username/i);
    expect(userNameText).toBeInTheDocument();

    const userName = screen.getByTestId("userNameTest");
    expect(userName).toBeInTheDocument();
    // await userEvent.type(userName, "John Doe");
    expect(userName).toHaveValue("John Doe");

    const email = screen.getByTestId("emailTest");
    expect(email).toBeInTheDocument();
    // await userEvent.type(email, "abc@gmail.com");
    expect(email).toHaveValue("devbakare00@gmail.com");

    const password = screen.getByTestId("passwordTest");
    expect(password).toBeInTheDocument();
    await userEvent.type(password, "J_john@1998");
    expect(password).toHaveValue("J_john@1998");

    const mobileNumber = screen.getByTestId("mobileNumberTest");
    expect(mobileNumber).toBeInTheDocument();
    //await userEvent.type(mobileNumber, "9087654321");
    expect(mobileNumber).toHaveValue("9087654321");

    const confirmPassword = screen.getByTestId("confirmPasswordTest");
    expect(confirmPassword).toBeInTheDocument();
    await userEvent.type(confirmPassword, "J_john@1998");
    expect(confirmPassword).toHaveValue("J_john@1998");

    const editProfileButton = screen.getByTestId("editProfileButtonTest");
    expect(editProfileButton).toBeInTheDocument();
  });
});
