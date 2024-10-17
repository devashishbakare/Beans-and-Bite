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
});
