import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Hidden } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { useHistory } from "react-router-dom";

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  let history = useHistory();

  let handelMenuShow = () => {
    setShowMenu(!showMenu);
  };

  let handeHomePage = () => {
    history.push("/");
  };
  let handelAboutUs = () => {
    history.push("/about");
  };

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handelMenuShow}
            >
              {showMenu ? <ArrowUpwardIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              variant="h6"
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                cursor: "pointer",
              }}
            >
              YouTubeTop20
            </Typography>
          </Toolbar>
          <div id={showMenu ? "mobileMenu" : "mobileMenuOff"}>
            <div className="mobilemenuoption" onClick={handelAboutUs}>
              <p>About Us</p>
            </div>
            <div className="mobilemenuoption">
              <p>Advertise</p>
            </div>
            <div className="mobilemenuoption">
              <p>Charaties</p>
            </div>
            <div className="mobilemenuoption">
              <p>Analytics</p>
            </div>
          </div>
        </AppBar>
      </Hidden>
      <Hidden only={["sm", "xs"]}>
        <AppBar position="static">
          <Toolbar style={{ paddingLeft: "6%", paddingRight: "6%" }}>
            <Typography
              variant="h6"
              style={{ cursor: "pointer" }}
              onClick={handeHomePage}
            >
              YouTubeTop20
            </Typography>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <p className="desktop-menu" onClick={handelAboutUs}>
                About Us
              </p>
              <p className="desktop-menu">Advertise</p>
              <p className="desktop-menu">Charaties</p>
              <p className="desktop-menu">Analytics</p>

              <p className="desktop-menu">Login</p>
            </div>
            <button className="desktop-button">Sign Up</button>
          </Toolbar>
        </AppBar>
      </Hidden>
    </>
  );
};

export default Topbar;
