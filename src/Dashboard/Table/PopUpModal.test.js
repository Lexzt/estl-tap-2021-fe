import React from "react";
import { render } from "@testing-library/react";
import PopUpModal from "./PopUpModal";

test("Closed Pop Up Modal", () => {
  const { container, debug } = render(
    <PopUpModal
      open={false}
      handleClose={() => {}}
      selectedData={{
        id: "",
        login: "",
        name: "",
        salary: "",
      }}
      onChange={() => {}}
    />
  );
  expect(container).toMatchInlineSnapshot("<div />");
});

test("Open Pop Up Modal", () => {
  const fakeObj = {
    id: "randomid1",
    login: "hello",
    name: "world",
    salary: "12345",
  };
  const { container, debug, getByText, getByLabelText, getBy } = render(
    <PopUpModal
      open={true}
      handleClose={() => {}}
      selectedData={fakeObj}
      onChange={() => {}}
    />
  );

  expect(getByText(fakeObj.id)).toBeInTheDocument();
  expect(getByText("Edit")).toBeInTheDocument();
  expect(getByText("Login")).toBeInTheDocument();
  expect(getByText("Salary")).toBeInTheDocument();

  expect(getByLabelText("Salary").value).toBe(fakeObj.salary);
  expect(getByLabelText("Login").value).toBe(fakeObj.login);
});
