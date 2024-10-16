import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Navbar } from "../Components/Navbar";
describe("Render Navbar", () => {
  test("check text on navbar", () => {
    act(() => {
      render(
        <Provider store={store}>
          <Navbar />
        </Provider>
      );
    });
    const appName = screen.getByText(/Home/i);
    expect(appName).toBeInTheDocument();
  });
  test("check click on account icon", async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Navbar />
        </Provider>
      );
    });
    //await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    const profileIcon = screen.getByTestId("profilePage");
    await userEvent.click(profileIcon);
    const textOnScreen = screen.getByText(/ Login to Beans and Bite/i);
    expect(textOnScreen).toBeInTheDocument();
  });
});
