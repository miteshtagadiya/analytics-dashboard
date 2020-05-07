import React from "react";
import renderer from "react-test-renderer";
import Title from "./Title";

test("renders correctly when there is no props", () => {
  const tree = renderer.create(<Title />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders correctly when there title prop", () => {
  const tree = renderer.create(<Title title="Title" />).toJSON();
  expect(tree).toMatchSnapshot();
});
