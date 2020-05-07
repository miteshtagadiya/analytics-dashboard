import React from "react";
import renderer from "react-test-renderer";
import CommonChart from "./CommonChart";

test("renders correctly when there is no props", () => {
  const tree = renderer.create(<CommonChart />).toJSON();
  expect(tree).toMatchSnapshot();
});
