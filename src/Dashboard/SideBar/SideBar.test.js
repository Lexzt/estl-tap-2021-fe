import React from "react";
import { render } from "@testing-library/react";
import SideBar from "./index";

test("Closed Side Bar CSS", () => {
  const { container, debug } = render(
    <SideBar
      open={false}
      handleDrawerOpen={() => {}}
      classes={{
        drawerPaper: { testing1: "testing-1" },
        drawerPaperClose: { testing2: "testing-2" },
      }}
    />
  );
  expect(container.firstChild.firstChild).toHaveClass("testing1");
  expect(container.firstChild.firstChild).toHaveClass("testing2");
});

test("Open Side Bar CSS", () => {
  const { container, debug } = render(
    <SideBar
      open={true}
      handleDrawerOpen={() => {}}
      classes={{
        drawerPaper: { testing1: "testing-1" },
        drawerPaperClose: { testing2: "testing-2" },
      }}
    />
  );
  expect(container.firstChild.firstChild).toHaveClass("testing1");
  expect(container.firstChild.firstChild).not.toHaveClass("testing2");
});
