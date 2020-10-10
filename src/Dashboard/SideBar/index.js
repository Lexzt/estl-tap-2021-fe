import React from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";

import { Avatar, ListItemIcon, ListItemText } from "@material-ui/core";
import { Divider, Drawer, IconButton, ListItem } from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, userProfile } from "../listItems";

export default function SideBar(props) {
  const { open, handleDrawerClose, classes } = props;
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
      <div>
        <ListItem>
          <ListItemIcon>
            <Avatar className={classes.small} src="/1.jpg" />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Long User Name" />
        </ListItem>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
    </Drawer>
  );
}
