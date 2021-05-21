import React, { useState, useEffect } from "react";
import { Hidden } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import {
  getUniqueRegions,
  getRegionalGlobalHot20List,
  getRegionalGlobalTop20List,
  getGlobalTop20List,
  getGlobalHot20List,
} from "../Services/GlobalServices";

import { useDispatch, useSelector } from "react-redux";
import {
  top20DataAction,
  hot20DataAction,
  regionsDataAction,
} from "../action/GlobalAction";

const SearchSectionDesktop = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [calander, setCalander] = useState(null);
  const [showCalander, setShowCalander] = useState(false);
  let handelDayClick = (e) => {
    let dateValue = moment(e).format("yyyy-MM-DD");
    setCalander(dateValue);
    setShowCalander(false);
  };

  useEffect(() => {
    let dateValue = moment().format("yyyy-MM-DD");
    setCalander(dateValue);
  }, []);

  let handelCalanderShow = () => {
    setShowCalander(!showCalander);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showMenuBar, setshowMenuBar] = useState(false);
  const [menuText, setMenuText] = useState("Global");

  let handelSelector = () => {
    setshowMenuBar(!showMenuBar);
  };

  let handelMenuClick = (e) => {
    setMenuText(e.target.textContent);
    setshowMenuBar(false);
  };
  let handelCalanderChange = () => {};

  const regionData = useSelector((state) => state.globalData.regions);

  let getRegions = async () => {
    try {
      let { data } = await getUniqueRegions();

      dispatch(regionsDataAction(data.Data));
    } catch (error) {
      console.log(error);
    }
  };

  let regionalHot20 = async () => {
    try {
      if (menuText !== "Global") {
        let { data } = await getRegionalGlobalHot20List(menuText);

        dispatch(hot20DataAction(data.Data));
      } else {
        let { data } = await getGlobalHot20List();
        dispatch(hot20DataAction(data.Data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  let regionalTop20 = async () => {
    try {
      if (menuText !== "Global") {
        let { data } = await getRegionalGlobalTop20List(menuText);
        dispatch(top20DataAction(data.Data));
      } else {
        let { data } = await getGlobalTop20List();
        dispatch(top20DataAction(data.Data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    regionalTop20();
    regionalHot20();
  }, [menuText]);

  useEffect(() => {
    getRegions();
  }, []);

  return (
    <Hidden only={["sm", "xs"]}>
      <Grid container className="searchSectionMainContainerDesktop">
        <Grid item xs={12}>
          <Grid
            container
            style={{ padding: "8px" }}
            className="customCard"
            spacing={3}
          >
            <Grid item xs={6}>
              <div id="searchinputmainDesktop">
                <input
                  placeholder="2021-04-22"
                  className="searchInput"
                  value={calander !== null ? calander : ""}
                  onChange={handelCalanderChange}
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
                  <Calendar maxDate={new Date()} onClickDay={handelDayClick} />
                </div>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div id="searchinputmain">
                <button className="searchSelector" onClick={handelSelector}>
                  {menuText}
                </button>

                {showMenuBar && (
                  <div className="selectorMenu">
                    {regionData.length > 0 &&
                      regionData.map((item, index) => {
                        return (
                          <p onClick={handelMenuClick} key={index}>
                            {item}
                          </p>
                        );
                      })}
                  </div>
                )}

                <ExpandMoreIcon id="searchinputicon" onClick={handelSelector} />
              </div>
            </Grid>
            {/* <Grid item xs={6}>
              <div id="searchinputmain">
                <input
                  placeholder="Global Top 20 Search"
                  className="searchInput"
                />
                <SearchIcon id="searchinputicon" />
              </div>
            </Grid> */}
            {/* <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
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
            </Grid> */}
            {/* <Grid item xs={12}>
              <Tabs
                onChange={handleChange}
                textColor="primary"
                TabIndicatorProps={{
                  style: {
                    display: "none",
                  },
                }}
                variant="scrollable"
                aria-label="scrollable auto tabs example"
                id="desktopTab"
                value={value}
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
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default SearchSectionDesktop;
