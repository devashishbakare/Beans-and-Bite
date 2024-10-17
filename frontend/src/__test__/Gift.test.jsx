import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Gift } from "../Components/Gift";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("Test Gift Section", () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      token: "mock-token",
      history: ["Home", "Gift"],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Check Gift Rendering", async () => {
    render(
      <Provider store={store}>
        <Gift />
      </Provider>
    );

    await waitFor(async () => {
      expect(screen.getByTestId("anytimeSection")).toBeInTheDocument();
      expect(screen.getByTestId("congratsSection")).toBeInTheDocument();
      expect(screen.getByTestId("thankYouSection")).toBeInTheDocument();

      await userEvent.click(screen.getByTestId("anytimeSection"));
      expect(screen.getAllByText(/My Treat/i)[0]).toBeInTheDocument();

      await userEvent.click(screen.getByTestId("congratsSection"));
      expect(screen.getAllByText(/Coffee, cheer/i)[0]).toBeInTheDocument();

      await userEvent.click(screen.getByTestId("thankYouSection"));
      expect(
        screen.getAllByText(
          /to the people who make coffee and those who love it, thank you/i
        )[0]
      ).toBeInTheDocument();
    });
  });
});
