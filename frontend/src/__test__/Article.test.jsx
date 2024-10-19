import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Article } from "../Components/Article";

describe("Article component test", () => {
  test("Article Rendring and Article View Test", async () => {
    render(
      <Provider store={store}>
        <Article />
      </Provider>
    );
    expect(
      screen.getByText(/Learn more about the world of coffee/i)
    ).toBeInTheDocument();
    await userEvent.click(screen.getAllByText(/View Article/i)[0]);
    expect(
      screen.getByText(/Art & Science of coffee brewing/i)
    ).toBeInTheDocument();
  });
});
