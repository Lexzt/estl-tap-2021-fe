import React from "react";
import { render } from "@testing-library/react";
import TopBar from "./index";

test("Closed Menu Bar CSS", () => {
  const { container, debug } = render(
    <TopBar
      open={false}
      handleDrawerOpen={() => {}}
      classes={{
        appBar: { testing1: "testing-1" },
        appBarShift: { testing2: "testing-2" },
      }}
    />
  );
  expect(container.firstChild).toHaveClass("testing1");
  expect(container.firstChild).not.toHaveClass("testing2");
});

test("Open Menu Bar CSS", () => {
  const { container, debug } = render(
    <TopBar
      open={true}
      handleDrawerOpen={() => {}}
      classes={{
        appBar: { testing1: "testing-1" },
        appBarShift: { testing2: "testing-2" },
      }}
    />
  );
  expect(container.firstChild).toHaveClass("testing1");
  expect(container.firstChild).toHaveClass("testing2");
});
