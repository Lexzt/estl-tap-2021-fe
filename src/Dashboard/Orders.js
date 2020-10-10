import React, { useEffect } from "react";
import Axios from "axios";
import buildUrl from "build-url";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";

import Title from "./Title";
import TablePaginationActions from "./Table/PaginationActions";
import PopUpModal from "./Table/PopUpModal";
import SalaryFilter from "./Table/SalaryFilter";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  TableFooter,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";

export default function Orders() {
  const rowsPerPage = 30;
  const URL = "http://localhost:3000";
  const headCells = [
    { id: "id", numeric: false, disablePadding: true, label: "ID", sort: true },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Name",
      sort: true,
    },
    {
      id: "login",
      numeric: false,
      disablePadding: false,
      label: "Login",
      sort: true,
    },
    {
      id: "salary",
      numeric: false,
      disablePadding: false,
      label: "Salary",
      sort: true,
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
      sort: false,
    },
  ];

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
        <TableHead>
          <TableCell />
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.sort ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.login}</TableCell>
              <TableCell>S${row.salary}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  aria-label="Edit Profile"
                  onClick={handleToggle(row)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  aria-label="Delete Profile"
                  onClick={handleToggle(row)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
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
