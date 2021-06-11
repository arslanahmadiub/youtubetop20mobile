import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Hidden } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Countdown from "react-countdown";
import { componentMode } from "../action/GlobalAction";
import { useSelector, useDispatch } from "react-redux";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { withStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import ListItemText from "@material-ui/core/ListItemText";

import PersonIcon from "@material-ui/icons/Person";
const StyledMenu = withStyles({
  paper: {
    background: "#3F51B5",
    color: "white",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenu2 = withStyles({
  paper: {
    background: "black",
    color: "white",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const StyledMenuItem2 = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "black",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const colorSelector = useSelector((state) => state.globalData.colorState);

  const handleChange = () => {
    dispatch(componentMode(!colorSelector));
  };

  let finalTime = 86400000;

  let t = moment.utc().format("HH:mm:ss");
  let ms =
    Number(t.split(":")[0]) * 60 * 60 * 1000 +
    Number(t.split(":")[1]) * 60 * 1000 +
    Number(t.split(":")[2]) * 1000;

  let remaningTime = finalTime - ms;

  let handelMenuShow = () => {
    setShowMenu(!showMenu);
  };

  let handeHomePage = () => {
    setShowMenu(false);
    history.push("/");
  };
  let handelAboutUs = () => {
    setShowMenu(false);

    history.push("/about");
  };

  let handelCharity = () => {
    setShowMenu(false);

    history.push("/charity");
  };

  let handelPush = (e) => {
    history.push(e);
    setAnchorEl(null);
  };

  let handleClickAwayFromSearchRegion = () => {
    setShowMenu(false);
  };

  let handelSignup = () => {
    history.push("/signup");
  };
  let handelLogin = () => {
    history.push("/signin");
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <span className="spanTime">
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </span>
    );
  };

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <AppBar
          position="static"
          style={{ background: colorSelector ? "black" : "#3f51b5" }}
        >
          <style>{`body {
  overflow-x: hidden !important;
  background: ${colorSelector ? "#424242" : "#F0EFEF"};
}

.topBarMobile{
  width:100%;
  display:flex;
  cursor:pointer;
  justify-content:center;
}

.topBeta{
  width: 100%;
  display: flex;
  cursor: pointer;
  font-size: 12px;
  margin-left: 10px;
}


@media only screen and (max-width: 355px) {
  .topBarMobile{
    font-size:14px
  }
  .topBeta{
    width: 100%;
    display: flex;
    cursor: pointer;
    font-size: 10px;
    margin-left: 8px;
  }
  .spanTime{
    font-size:14px;
    
  }
}
@media only screen and (max-width: 280px) {
  .topBarMobile{
    font-size:12px
  }
  .topBeta{
    width: 100%;
    display: flex;
    cursor: pointer;
    font-size: 8px;
    margin-left: 8px;
  }
  .spanTime{
    font-size:12px;
    
  }
}

`}</style>
          <Toolbar>
            <ClickAwayListener onClickAway={handleClickAwayFromSearchRegion}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handelMenuShow}
              >
                {showMenu ? <ArrowUpwardIcon /> : <MenuIcon />}
              </IconButton>
            </ClickAwayListener>
            <Typography
              variant="h6"
              className="topBarMobile"
              onClick={handeHomePage}
            >
              GlobalTop20
            </Typography>
            <Typography className="topBeta">Beta 2.0</Typography>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Countdown date={Date.now() + remaningTime} renderer={renderer} />
            </div>
            <div>
              <IconButton aria-label="add an alarm" onClick={handleChange}>
                {colorSelector ? (
                  <WbSunnyIcon style={{ color: "white" }} />
                ) : (
                  <Brightness3Icon style={{ color: "black" }} />
                )}
              </IconButton>
            </div>
          </Toolbar>
          {colorSelector ? (
            <div id={showMenu ? "mobileMenuBlack" : "mobileMenuOffBlack"}>
              <div className="mobilemenuoption" onClick={handelAboutUs}>
                <p>About Us</p>
              </div>

              <div className="mobilemenuoption">
                <p onClick={handelCharity}>Charities</p>
              </div>
              <div className="mobilemenuoption">
                <p onClick={handelLogin}>Login</p>
              </div>
              <div className="mobilemenuoption">
                <p onClick={handelSignup}>Sign Up</p>
              </div>
            </div>
          ) : (
            <div id={showMenu ? "mobileMenu" : "mobileMenuOff"}>
              <div className="mobilemenuoption" onClick={handelAboutUs}>
                <p>About Us</p>
              </div>

              <div className="mobilemenuoption">
                <p onClick={handelCharity}>Charities</p>
              </div>
              <div className="mobilemenuoption">
                <p onClick={handelLogin}>Login</p>
              </div>
              <div className="mobilemenuoption">
                <p onClick={handelSignup}>Sign Up</p>
              </div>
            </div>
          )}
        </AppBar>
      </Hidden>
      <Hidden only={["sm", "xs"]}>
        <AppBar
          position="static"
          style={{ background: colorSelector ? "black" : "#3f51b5" }}
        >
          <style>{`body {
  overflow-x: hidden !important;
  background: ${colorSelector ? "#424242" : "#F0EFEF"};
}

::-webkit-scrollbar {
  width: 12px;

  background: ${colorSelector ? "#424242" : "#F0EFEF"};
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background: ${colorSelector ? "#F0EFEF" : "#3f51b5"};
}


`}</style>
          <Toolbar style={{ paddingRight: "6%" }}>
            <Typography
              variant="h6"
              style={{ cursor: "pointer" }}
              onClick={handeHomePage}
            >
              GlobalTop20
            </Typography>
            <p style={{ fontSize: "10px", display: "flex", marginLeft: "5px" }}>
              Beta
            </p>
            <p style={{ fontSize: "10px", marginLeft: "2px" }}>2.0</p>
            <div style={{ marginLeft: "20px" }}>
              <Countdown date={Date.now() + remaningTime} renderer={renderer} />
            </div>

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

              <p className="desktop-menu" onClick={handelCharity}>
                Charities
              </p>
            </div>
            <div>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={handleClick}
              >
                <PersonIcon style={{ color: "white" }} />
              </IconButton>
              {colorSelector ? (
                <StyledMenu2
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem2 onClick={() => handelPush("/signin")}>
                    <ListItemText primary="Login" />
                  </StyledMenuItem2>
                  <StyledMenuItem2 onClick={() => handelPush("/signup")}>
                    <ListItemText primary="Sign Up" />
                  </StyledMenuItem2>
                </StyledMenu2>
              ) : (
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem onClick={() => handelPush("/signin")}>
                    <ListItemText primary="Login" />
                  </StyledMenuItem>
                  <StyledMenuItem onClick={() => handelPush("/signup")}>
                    <ListItemText primary="Sign Up" />
                  </StyledMenuItem>
                </StyledMenu>
              )}
            </div>
            <IconButton aria-label="add an alarm" onClick={handleChange}>
              {colorSelector ? (
                <WbSunnyIcon style={{ color: "white" }} />
              ) : (
                <Brightness3Icon style={{ color: "black" }} />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Hidden>
    </>
  );
};

export default Topbar;
