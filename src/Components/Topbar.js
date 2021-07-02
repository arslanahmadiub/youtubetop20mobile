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
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import Zoom from "@material-ui/core/Zoom";
import colorIcon from "./images/color.svg";
import darkIcon from "./images/dark.svg";

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

const BlackOnGreenTooltip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "#0f478c",
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    "&::before": {
      backgroundColor: "#0f478c",
    },
  },
})(Tooltip);
const BlueOnGreenTooltip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "gray",
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    "&::before": {
      backgroundColor: "gray",
    },
  },
})(Tooltip);

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
  const [showTooltipMobile, setShowTooltipMobile] = useState(false);

  let handleClickAwayTop20ToolTip = () => {
    setShowTooltipMobile(false);
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
            {/* <Typography className="topBeta">Beta 3.0</Typography> */}
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Countdown date={Date.now() + remaningTime} renderer={renderer} />

              {colorSelector ? (
                <ClickAwayListener onClickAway={handleClickAwayTop20ToolTip}>
                  <BlackOnGreenTooltip
                    title="count down to the next day’s results"
                    arrow
                    TransitionComponent={Zoom}
                    open={showTooltipMobile}
                  >
                    <img
                      src={colorIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "1%",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => setShowTooltipMobile(true)}
                    />
                  </BlackOnGreenTooltip>
                </ClickAwayListener>
              ) : (
                <ClickAwayListener onClickAway={handleClickAwayTop20ToolTip}>
                  <BlueOnGreenTooltip
                    title="count down to the next day’s results"
                    style={{ color: "red" }}
                    arrow
                    TransitionComponent={Zoom}
                    open={showTooltipMobile}
                  >
                    <img
                      src={darkIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "1%",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => setShowTooltipMobile(true)}
                    />
                  </BlueOnGreenTooltip>
                </ClickAwayListener>
              )}
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
                <p>Guide</p>
              </div>

              {/* <div className="mobilemenuoption">
                <p onClick={handelCharity}>Charities</p>
              </div> */}
              {/* <div className="mobilemenuoption">
                <p onClick={handelLogin}>Login</p>
              </div>
              <div className="mobilemenuoption">
                <p onClick={handelSignup}>Sign Up</p>
              </div> */}
            </div>
          ) : (
            <div id={showMenu ? "mobileMenu" : "mobileMenuOff"}>
              <div className="mobilemenuoption" onClick={handelAboutUs}>
                <p>Guide </p>
              </div>

              {/* <div className="mobilemenuoption">
                <p onClick={handelCharity}>Charities</p>
              </div> */}
              {/* <div className="mobilemenuoption">
                <p onClick={handelLogin}>Login</p>
              </div>
              <div className="mobilemenuoption">
                <p onClick={handelSignup}>Sign Up</p>
              </div> */}
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

  background: ${colorSelector ? "black" : "#3F51B5"};
  display:none;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background: ${colorSelector ? "#F0EFEF" : "white"};
  
display:none;
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
            {/* <p style={{ fontSize: "10px", display: "flex", marginLeft: "5px" }}>
              Beta
            </p>
            <p style={{ fontSize: "10px", marginLeft: "2px" }}>3.0</p> */}
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Countdown date={Date.now() + remaningTime} renderer={renderer} />

              {colorSelector ? (
                <BlackOnGreenTooltip
                  title="count down to the next day’s results"
                  style={{ color: "red" }}
                  arrow
                  TransitionComponent={Zoom}
                >
                  <img
                    src={colorIcon}
                    style={{
                      marginLeft: "10px",
                      marginTop: "2%",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </BlackOnGreenTooltip>
              ) : (
                <BlueOnGreenTooltip
                  title="
  count down to the next day’s results"
                  style={{ color: "red" }}
                  arrow
                  TransitionComponent={Zoom}
                >
                  <img
                    src={darkIcon}
                    style={{
                      marginLeft: "10px",
                      marginTop: "2%",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </BlueOnGreenTooltip>
              )}
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <p className="desktop-menu" onClick={handelAboutUs}>
                Guide
              </p>

              {/* <p className="desktop-menu" onClick={handelCharity}>
                Charities
              </p> */}
            </div>
            {/* <div>
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
            </div> */}
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
