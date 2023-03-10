import React from "react";
import ReactDOM from "react-dom";
import Star from "./Star";

test("render a star", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Star></Star>, div);
  expect(div.querySelector("svg")).toBeTruthy();

  expect(div.querySelector("svg")).toHaveAttribute("id", "star");

})