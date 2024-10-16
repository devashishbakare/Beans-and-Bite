import React from "react";
import { render, screen, act } from "@testing-library/react";
import useEvent from "@testing-library/user-event";
import { SignInUpModal } from "../Components/SignInUpModal";
import { Home } from "../Components/Home";
import { Provider } from "react-redux";
import { store } from "../redux/store";
describe("Render home page and check sign in up form", () => {
  test("Render HomePage", () => {
    act(() => {
      render(
        <Provider store={store}>
          <Home />
        </Provider>
      );
    });
    const appName = screen.getByText(/Beans And Bite/i);
    expect(appName).toBeInTheDocument();
  });
});
