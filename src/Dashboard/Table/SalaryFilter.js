import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { Grid, InputAdornment } from "@material-ui/core";

export default function SalaryFilter(props) {
  const { values, handleChange } = props;

  return (
    <Grid container spacing={1}>
      <Grid item xs={5}>
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
      <Grid item xs={2}>
        <h3>-</h3>
      </Grid>
      <Grid item xs={5}>
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

SalaryFilter.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
};
