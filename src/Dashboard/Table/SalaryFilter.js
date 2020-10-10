import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, InputAdornment } from "@material-ui/core";

export default function PopUpModal(props) {
  const { values, handleChange } = props;

  return (
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
  );
}
