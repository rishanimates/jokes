import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "./App";
import '@testing-library/jest-dom';

describe("App", () => {
  it('renders without crashing', () => {
    render(<App />, { container: window.root });
  });

  it("should have a header child", () => {
    render(<App />, { container: window.root });
    const headerElement = document.getElementsByTagName("header")[0];
    expect(headerElement).toBeInTheDocument();
  });
  
  it("should have a header child", () => {
    render(<App />, { container: window.root });
    const sectionElement = document.getElementsByTagName("section");
    expect(sectionElement).toHaveLength(1)

  });
});
