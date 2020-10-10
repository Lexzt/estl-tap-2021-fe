import React from "react";
import { render } from "@testing-library/react";
import Body from "./index";
import { Table, TableBody } from "@material-ui/core";

test("Table Body (No Rows)", () => {
  const { container, debug } = render(
    <Table>
      <TableBody>
        <Body rows={[]} handleToggle={() => {}} />
      </TableBody>
    </Table>
  );
  expect(container.childElementCount).toBe(1);
  expect(container.firstChild.childElementCount).toBe(1);
  expect(container.firstChild.firstChild.childElementCount).toBe(0);
});

test("Table Body (2 Rows)", () => {
  const fakeData = [
    {
      id: "e0177",
      name: "unique_name1",
      login: "unique_login1",
      salary: "5678",
    },
    {
      id: "e0178",
      name: "unique_name2",
      login: "unique_login2",
      salary: "1234",
    },
  ];
  const { container, debug, getByText } = render(
    <Table>
      <TableBody>
        <Body rows={fakeData} handleToggle={() => {}} />
      </TableBody>
    </Table>
  );
  expect(container.firstChild.firstChild.childElementCount).toBe(
    fakeData.length
  );

  expect(getByText(fakeData[0].id)).toBeInTheDocument();
  expect(getByText(fakeData[0].name)).toBeInTheDocument();
  expect(getByText(fakeData[0].login)).toBeInTheDocument();
  expect(getByText(fakeData[0].salary, { exact: false })).toBeInTheDocument();

  expect(getByText(fakeData[1].id)).toBeInTheDocument();
  expect(getByText(fakeData[1].name)).toBeInTheDocument();
  expect(getByText(fakeData[1].login)).toBeInTheDocument();
  expect(getByText(fakeData[1].salary, { exact: false })).toBeInTheDocument();
});
