import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Hidden } from "@material-ui/core";

const Topbar = () => {
  return (
    <Hidden only={["md", "lg", "xl"]}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{ width: "100%", justifyContent: "center", display: "flex" }}
          >
            YOUTUBETOP20
          </Typography>
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};

export default Topbar;
