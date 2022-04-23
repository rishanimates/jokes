import React from "react";
import { render, within } from "@testing-library/react";
import Jokes from "../pages/Jokes";
import '@testing-library/jest-dom';
import { SnackbarProvider } from "notistack";

describe("Jokes", () => {
  it("renders given amount of images", () => {
    const { getAllByRole } = render(<SnackbarProvider>
      <Jokes />
    </SnackbarProvider>);
    const listItems = getAllByRole('button');
    const { getByText } = within(listItems[0])
    const btn = getByText('Fetch');
    expect(btn).toBeInTheDocument();
  });
});
