import React, { useState } from "react";
import { Hidden } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const SearchSectionDesktop = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [calander, setCalander] = useState(null);
  const [showCalander, setShowCalander] = useState(false);
  let handelDayClick = (e) => {
    let dateValue = moment(e).format("yyyy-MM-DD");
    setCalander(dateValue);
    setShowCalander(false);
  };

  let handelCalanderShow = () => {
    setShowCalander(!showCalander);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Hidden only={["sm", "xs"]}>
      <Grid container className="searchSectionMainContainerDesktop">
        <Grid item xs={12}>
          <Grid
            container
            style={{ padding: "15px" }}
            className="customCard"
            spacing={4}
          >
            <Grid item xs={2}>
              <div id="searchinputmainDesktop">
                <input
                  placeholder="2021-04-22"
                  className="searchInput"
                  value={calander !== null ? calander : ""}
                />
                <ExpandMoreIcon
                  id="searchinputicon"
                  onClick={handelCalanderShow}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    display: showCalander ? "flex" : "none",
                    zIndex: "50",
                    overflow: "auto",
                  }}
                >
                  <Calendar onClickDay={handelDayClick} />
                </div>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div id="searchinputmain">
                <select name="cars" id="cars" className="searchSelector">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
                <ExpandMoreIcon id="searchinputicon" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div id="searchinputmain">
                <input
                  placeholder="YouTube Top 20 Search"
                  className="searchInput"
                />
                <SearchIcon id="searchinputicon" />
              </div>
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "5px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ height: "37px" }}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Tabs
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="All" id="tabStyleActive" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
                <Tab label="Filter" id="tabStyle" />
              </Tabs>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default SearchSectionDesktop;
