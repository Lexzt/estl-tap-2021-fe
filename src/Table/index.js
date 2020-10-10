import React, { useEffect } from "react";
import Axios from "axios";
import buildUrl from "build-url";

import {
  Table,
  TableBody,
  TableFooter,
  TablePagination,
} from "@material-ui/core";

import TablePaginationActions from "../Dashboard/Table/PaginationActions";
import PopUpModal from "../Dashboard/Table/PopUpModal";
import SalaryFilter from "../Dashboard/Table/SalaryFilter";

import Title from "../Dashboard/Title";

import Header from "./Header";
import Body from "./Body";

export default function Orders() {
  const rowsPerPage = 30;
  const URL = "http://localhost:3000";

  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsCount, setRowsCount] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setValues({ ...values, offset: newPage * 30 });
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (row) => () => {
    setOpen(!open);
    setSelectedData(row);
  };

  const [selectedData, setSelectedData] = React.useState({});
  const [values, setValues] = React.useState({
    minSal: 0,
    maxSal: 10000,
    offset: 0,
  });
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("salary");

  const handleChange = (prop) => (event) => {
    const regexNumeric = RegExp(/^-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/);
    if (regexNumeric.test(event.target.value)) {
      setValues({ ...values, [prop]: parseFloat(event.target.value) });
    }
  };
  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let sortStr = "";
      if (order === "asc") {
        sortStr = `+${orderBy}`;
      } else if (order === "desc") {
        sortStr = `-${orderBy}`;
      }

      const getURL = buildUrl(URL, {
        path: "users",
        queryParams: {
          minSalary: values.minSal,
          maxSalary: values.maxSal,
          offset: values.offset,
          limit: 30,
          sort: sortStr,
        },
      });

      const config = {
        method: "GET",
        url: getURL.toString(),
        headers: {},
      };

      const data = await Axios(config)
        .then((response) => response.data.results)
        .catch((error) => {
          console.error("Retrieve Users Error: ", error);
          return [];
        });

      setRows(data);
    };

    const fetchUsersCount = async () => {
      const getURL = buildUrl(URL, {
        path: "users/count",
        queryParams: {
          minSalary: values.minSal,
          maxSalary: values.maxSal,
        },
      });

      const config = {
        method: "GET",
        url: getURL.toString(),
        headers: {},
      };

      const data = await Axios(config)
        .then((response) => response.data.results)
        .catch((error) => {
          console.error("Retrieve Users Count Error: ", error);
          return -1;
        });

      setRowsCount(data);
    };
    fetchUsers();
    fetchUsersCount();
  }, [order, orderBy, values.maxSal, values.minSal, values.offset]);

  return (
    <React.Fragment>
      <SalaryFilter values={values} handleChange={handleChange} />

      <Title>Employees</Title>
      <Table>
        <Header
          orderBy={orderBy}
          order={order}
          createSortHandler={createSortHandler}
        />

        <TableBody>
          <Body rows={rows} handleToggle={handleToggle} />
        </TableBody>

        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[30]}
            count={rowsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            ActionsComponent={TablePaginationActions}
          />
        </TableFooter>

        <PopUpModal
          open={open}
          handleClose={handleClose}
          selectedData={selectedData}
        />
      </Table>
    </React.Fragment>
  );
}
