import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignInUpModal } from "../Components/SignInUpModal";
import { Home } from "../Components/Home";
import { Provider } from "react-redux";
import { store } from "../redux/store";
describe("Sign In Up Form", () => {
  test("Render Sign In Up Component", () => {
    act(() => {
      render(
        <Provider store={store}>
          <SignInUpModal />
        </Provider>
      );
    });
    const appName = screen.getByText(/Login to Beans and Bite/i);
    expect(appName).toBeInTheDocument();
  });

  test("Check sign in input", async () => {
    act(() => {
      render(
        <Provider store={store}>
          <SignInUpModal />
        </Provider>
      );
    });
    const signInUserName = screen.getByTestId("signIn-userName");
    expect(signInUserName).toBeInTheDocument();
    await userEvent.type(signInUserName, "devbakare00@gmail.com");
    expect(signInUserName).toHaveValue("devbakare00@gmail.com");

    const signInPassword = screen.getByTestId("signIn-password");
    expect(signInPassword).toBeInTheDocument();
    await userEvent.type(signInPassword, "J_John@1198");
    expect(signInPassword).toHaveValue("J_John@1198");

    const signInButton = screen.getByTestId("signInButton");
    expect(signInButton).toBeInTheDocument();
  });

  test("Check sign up input", async () => {
    act(() => {
      render(
        <Provider store={store}>
          <SignInUpModal />
        </Provider>
      );
    });

    const getTheForm = screen.getByTestId("showSignUpForm");
    await userEvent.click(getTheForm);

    const signUpName = screen.getByTestId("signUpName");
    expect(signUpName).toBeInTheDocument();
    await userEvent.type(signUpName, "John Doe");
    expect(signUpName).toHaveValue("John Doe");

    const signUpEmail = screen.getByTestId("signUpEmail");
    expect(signUpEmail).toBeInTheDocument();
    await userEvent.type(signUpEmail, "John Doe");
    expect(signUpEmail).toHaveValue("John Doe");

    const signUpMobileNumber = screen.getByTestId("signUpMobileNumber");
    expect(signUpMobileNumber).toBeInTheDocument();
    await userEvent.type(signUpMobileNumber, "9876543210");
    expect(signUpMobileNumber).toHaveValue("9876543210");

    const signUpPassword = screen.getByTestId("signUpPassword");
    expect(signUpPassword).toBeInTheDocument();
    await userEvent.type(signUpPassword, "J_john@1998");
    expect(signUpPassword).toHaveValue("J_john@1998");

    const signUpConfirmPassword = screen.getByTestId("signUpConfirmPassword");
    expect(signUpConfirmPassword).toBeInTheDocument();
    await userEvent.type(signUpConfirmPassword, "J_john@1998");
    expect(signUpConfirmPassword).toHaveValue("J_john@1998");

    const signUpButton = screen.getByTestId("signUpButton");
    expect(signUpButton).toBeInTheDocument();
  });
});
