import React from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Avatar from "@material-ui/core/Avatar";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Table, TableBody } from "@material-ui/core";

export default function Body(props) {
  const { rows, handleToggle } = props;
  return rows.map((row) => (
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
  ));
}

Body.propTypes = {
  rows: PropTypes.array,
  handleToggle: PropTypes.func,
};
