import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import List from "@material-ui/core/List";

import {
  Avatar,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Divider, Drawer, IconButton, ListItem } from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuItems from "../MenuItems";

export default function SideBar(props) {
  const { open, handleDrawerClose, classes } = props;
  const userName = "Long User Name Lorem Ipsum is simply dummy";

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List>
        <ListItem>
          <ListItemIcon>
            <ListItemAvatar>
              <Avatar
                style={{ width: "24px", height: "24px" }}
                src="https://material-ui.com/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              open
                ? userName.length > 32
                  ? userName.substr(0, 32) + "..."
                  : userName
                : userName.substr(0, 4)
            }
          />
        </ListItem>
      </List>
      <Divider />
      <List>{MenuItems}</List>
      <Divider />
    </Drawer>
  );
}

SideBar.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  classes: PropTypes.object.isRequired,
};
