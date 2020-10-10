import React from "react";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { TableRow, TableSortLabel } from "@material-ui/core";

export default function TableHeader(props) {
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

  const { orderBy, order, createSortHandler } = props;

  return (
    <TableHead>
      <TableRow>
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
      </TableRow>
    </TableHead>
  );
}

TableHeader.propTypes = {
  orderBy: PropTypes.string,
  order: PropTypes.string,
  createSortHandler: PropTypes.func,
};
