import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import IconButton from '@material-ui/core/IconButton';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button, Divider, Grid, InputAdornment, TableFooter, TablePagination } from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';

import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar'

import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

// Generate Order Data
function createData(id, name, login, salary) {
  return { id, name, login, salary };
}

const rows = [
  createData('e0001','hpotter','Harry Potter',1234),
  createData('e0002','rwesley','Ron Weasley',19234.5),
  createData('e0003','ssnape','Severus Snape',4000),
  createData('e0004','rhagrid','Rubeus Hagrid',3999.999),
  createData('e0005','voldemort','Lord Voldemort',523.4),
  createData('e0006','gwesley','Ginny Weasley',4000.004),
  createData('e0007','hgranger','Hermione Granger',0),
  createData('e0008','adumbledore','Albus Dumbledore',34.23),
  createData('e0009','dmalfoy','Draco Malfoy',34234.5),
  createData('e0001','hpotter','Harry Potter',1234),
  createData('e0002','rwesley','Ron Weasley',19234.5),
  createData('e0003','ssnape','Severus Snape',4000),
  createData('e0004','rhagrid','Rubeus Hagrid',3999.999),
  createData('e0005','voldemort','Lord Voldemort',523.4),
  createData('e0006','gwesley','Ginny Weasley',4000.004),
  createData('e0007','hgranger','Hermione Granger',0),
  createData('e0008','adumbledore','Albus Dumbledore',34.23),
  createData('e0009','dmalfoy','Draco Malfoy',34234.5),
  createData('e0001','hpotter','Harry Potter',1234),
  createData('e0002','rwesley','Ron Weasley',19234.5),
  createData('e0003','ssnape','Severus Snape',4000),
  createData('e0004','rhagrid','Rubeus Hagrid',3999.999),
  createData('e0005','voldemort','Lord Voldemort',523.4),
  createData('e0006','gwesley','Ginny Weasley',4000.004),
  createData('e0007','hgranger','Hermione Granger',0),
  createData('e0008','adumbledore','Albus Dumbledore',34.23),
  createData('e0009','dmalfoy','Draco Malfoy',34234.5),
  createData('e0001','hpotter','Harry Potter',1234),
  createData('e0002','rwesley','Ron Weasley',19234.5),
  createData('e0003','ssnape','Severus Snape',4000),
  createData('e0004','rhagrid','Rubeus Hagrid',3999.999),
  createData('e0005','voldemort','Lord Voldemort',523.4),
  createData('e0006','gwesley','Ginny Weasley',4000.004),
  createData('e0007','hgranger','Hermione Granger',0),
  createData('e0008','adumbledore','Albus Dumbledore',34.23),
  createData('e0009','dmalfoy','Draco Malfoy',34234.5),
  createData('e0001','hpotter','Harry Potter',1234),
  createData('e0002','rwesley','Ron Weasley',19234.5),
  createData('e0003','ssnape','Severus Snape',4000),
  createData('e0004','rhagrid','Rubeus Hagrid',3999.999),
  createData('e0005','voldemort','Lord Voldemort',523.4),
  createData('e0006','gwesley','Ginny Weasley',4000.004),
  createData('e0007','hgranger','Hermione Granger',0),
  createData('e0008','adumbledore','Albus Dumbledore',34.23),
  createData('e0009','dmalfoy','Draco Malfoy',34234.5),
];

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default function Orders() {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    paper: {
      position: 'absolute',
      width: 500,
      height: 600,
      backgroundColor: theme.palette.background.paper,
      outline: 0,
      // border: '0px solid #000',
      // boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 4, 5),
    },
  }));
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const [values, setValues] = React.useState({
    minSal: 0,
    maxSal: 0,
  });

  const handleChange = (prop) => (event) => {
    console.log(event.target.value, values);
    if (isNaN(event.target.value)) {
      return;
    } else {
      setValues({ ...values, [prop]: parseFloat(event.target.value) });
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="min-sal"
            label="Minimum Salary"
            // type="number"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            // variant="filled"
            onChange={handleChange('minSal')}
            value={values.minSal}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="max-sal"
            label="Maximum Salary"
            // type="number"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            // variant="filled"
            // validator={(input) => isNaN(input)}
            onChange={handleChange('maxSal')}
            value={values.maxSal}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </Grid>
      </Grid>

      <Title>Employees</Title>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Login</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.login}</TableCell>
              <TableCell>S${row.salary}</TableCell>
              <TableCell>
                <IconButton color="primary" aria-label="Edit Profile">
                  <EditIcon/>
                </IconButton>
                <IconButton color="secondary" aria-label="Delete Profile" >
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))} */}
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow>
              <TableCell>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/3.jpg" />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.login}</TableCell>
              <TableCell>S${row.salary}</TableCell>
              <TableCell>
                <IconButton color="primary" aria-label="Edit Profile" onClick={handleToggle}>
                  <EditIcon/>
                </IconButton>
                <IconButton color="secondary" aria-label="Delete Profile" onClick={handleToggle}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[30]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div className={classes.paper}>
          <Grid container spacing={0}>
            {/* <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <CancelIcon/>
                </Grid>
                <Grid item xs={9}>
                  <h1 id="simple-modal-title">Edit</h1>
                </Grid>
              </Grid>
              <Divider/>
            </Grid> */}

            <Grid item xs={12}>
              <h1 id="simple-modal-title">Edit</h1>
            </Grid>
            <Grid item xs={12}>
              <Divider/>
            </Grid>

            <Grid item xs={12}>
              <h3 id="simple-modal-title">Employee Id Lorem Ipsum</h3>
            </Grid>
            <Grid item xs={12}>
              <TextField id="edit-name" label="Name" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="edit-login" label="Login" />
            </Grid>
            <Grid item xs={12}>
              <TextField id="edit-salary" label="Salary" />
            </Grid>

            <Grid item xs={12}>
              <Divider/>
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
