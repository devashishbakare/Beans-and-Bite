import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Wallet } from "../Components/Wallet";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Wallet Component Testing", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      isAuthenticated: true,
      history: ["Home", "Wallet"],
      wallet: 1000,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Wallet Component Testing", async () => {
    render(
      <Provider store={store}>
        <Wallet />
      </Provider>
    );

    expect(screen.getByText(/Balance in your wallet/i)).toBeInTheDocument();

    const button = screen.getByText(/Add Money To Your Wallet/i);
    await userEvent.click(button);
    expect(screen.getByText(/Enter Amount/i)).toBeInTheDocument();

    const amountSection = screen.getByTestId("walletAmount");
    await userEvent.type(amountSection, "200");

    expect(amountSection).toHaveValue(200);
  });
});
