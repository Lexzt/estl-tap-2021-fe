import React from "react";
import Modal from "@material-ui/core/Modal";
import {
  Divider,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";

export default function PopUpModal(props) {
  const useStyles = makeStyles((theme) => ({
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

  const { open, handleClose, selectedData } = props;

  return (
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
  );
}
