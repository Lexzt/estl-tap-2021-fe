import React, { useEffect } from "react";
import Axios from "axios";
import { animateScroll as scroll } from "react-scroll";
import buildUrl from "build-url";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

import Title from "./Title";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  TableFooter,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    // textAlign: "center",
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default function Orders() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    paper: {
      position: "absolute",
      width: 500,
      height: 600,
      backgroundColor: theme.palette.background.paper,
      outline: 0,
      padding: theme.spacing(1, 4, 5),
    },
  }));
  const classes = useStyles();
  const rowsPerPage = 30;

  const [page, setPage] = React.useState(0);
  const [selectedData, setSelectedData] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [rowsCount, setRowsCount] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    scroll.scrollToTop();
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

  const [values, setValues] = React.useState({
    minSal: 0,
    maxSal: 10000,
    offset: 0,
  });

  const handleChange = (prop) => (event) => {
    const regexNumeric = RegExp(/^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/);
    if (regexNumeric.test(event.target.value)) {
      setValues({ ...values, [prop]: parseFloat(event.target.value) });
    }
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("salary");

  const URL = "http://localhost:3000";

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

  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="min-sal"
            label="Minimum Salary"
            onChange={handleChange("minSal")}
            value={values.minSal}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">S$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="max-sal"
            label="Maximum Salary"
            onChange={handleChange("maxSal")}
            value={values.maxSal}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">S$</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

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
      </Table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={classes.paper}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <h1 id="simple-modal-title">Edit</h1>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <h3 id="simple-modal-title">{selectedData.id}</h3>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="edit-name"
                label="Name"
                defaultValue={selectedData.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="edit-login"
                label="Login"
                defaultValue={selectedData.login}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="edit-salary"
                label="Salary"
                defaultValue={selectedData.salary}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained">Save</Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </React.Fragment>
  );
}
