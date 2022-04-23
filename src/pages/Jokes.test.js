import React from "react";
import { render, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SnackbarProvider } from "notistack";
import Jokes from "./Jokes";

describe("Jokes", () => {
  it("renders Fetch Button", () => {
    const { getAllByRole } = render(
      <SnackbarProvider>
        <Jokes />
      </SnackbarProvider>
    );
    const listItems = getAllByRole("button");
    const { getByText } = within(listItems[0]);
    const btn = getByText("Fetch");
    expect(btn).toBeInTheDocument();
  });
});
