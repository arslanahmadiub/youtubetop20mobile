import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Hidden } from "@material-ui/core";

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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CustomSelectorWithTick from "./CustomComponents/CustomSelectorWithTick";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SearchingSection = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [loadBackdrop, setLoadBackdrop] = useState(true);
  const colorSelector = useSelector((state) => state.globalData.colorState);
  const [listOfRegions, setListOfRegions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoadBackdrop(false);
    }, 3000);
  }, []);

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

  useEffect(() => {
    let dateValue = moment().format("yyyy-MM-DD");
    setCalander(dateValue);
  }, []);
  const [showMenuBar, setshowMenuBar] = useState(false);
  const [menuText, setMenuText] = useState("Global");

  let handelSelector = () => {
    // setLoadBackdrop(true);
    if (filterRegionData.length < 1) {
      setFilterRegionData(regionData);
    }
    setshowMenuBar(!showMenuBar);
  };

  let handelMenuClick = (e) => {
    setLoadBackdrop(true);

    setMenuText(e.target.textContent);
    setshowMenuBar(false);

    regionalTop20(e.target.textContent);
    regionalHot20(e.target.textContent);
    setTimeout(() => {
      setLoadBackdrop(false);
    }, 4000);
  };
  const regionData = useSelector((state) => state.globalData.regions);

  let getRegions = async () => {
    try {
      let { data } = await getUniqueRegions();

      data.Data.unshift("Global");

      dispatch(regionsDataAction(data.Data));
    } catch (error) {
      console.log(error);
    }
  };

  let regionalHot20 = async (text) => {
    try {
      if (text !== "Global") {
        let { data } = await getRegionalGlobalHot20List(text);

        dispatch(hot20DataAction(data.Data));
      } else {
        let { data } = await getGlobalHot20List();
        dispatch(hot20DataAction(data.Data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  let regionalTop20 = async (text) => {
    try {
      if (text !== "Global") {
        let { data } = await getRegionalGlobalTop20List(text);

        dispatch(top20DataAction(data.Data));
      } else {
        let { data } = await getGlobalTop20List();

        dispatch(top20DataAction(data.Data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  let handleClickAway = () => {
    if (showCalander) {
      setShowCalander(false);
    }
  };
  // useEffect(() => {
  //   regionalTop20();
  //   regionalHot20();
  // }, [menuText]);

  useEffect(() => {
    getRegions();
  }, []);
  let handelCalanderChange = () => {};
  const [filterRegionData, setFilterRegionData] = useState([]);

  let handelRegionChange = (e) => {
    const p = Array.from(e.target.value.toLowerCase()).reduce(
      (a, v, i) => `${a}[^${e.target.value.toLowerCase().substr(i)}]*?${v}`,
      ""
    );
    const re = RegExp(p);

    let filterData = regionData.filter((v) => v.toLowerCase().match(re));

    setFilterRegionData(filterData);
    setshowMenuBar(true);
    setMenuText(e.target.value);
  };

  let handelMenuFocus = () => {
    if (filterRegionData.length < 1) {
      setFilterRegionData(regionData);
    }

    setMenuText("");
    setshowMenuBar(true);
  };
  let handleClickAwayFromSearchRegion = () => {
    if (showMenuBar) {
      setshowMenuBar(false);
    }
    if (menuText === "") {
      setMenuText("Global");
    }
  };

  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <Backdrop className={classes.backdrop} open={loadBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* <Grid container>
          <Grid item xs={8}>
            <div id="searchinputmain">
              <input
                placeholder="Global Top 20 Search"
                className="searchInput"
              />
              <SearchIcon id="searchinputicon" />
            </div>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ height: "38px" }}
            >
              Search
            </Button>
          </Grid>
        </Grid> */}
        <br />
        <Grid
          container
          spacing={2}
          style={{ paddingLeft: "2%", paddingRight: "2%" }}
        >
          <Grid
            item
            xs={12}
            style={{
              paddingRight: "4%",
              display: advanceSearch ? "none" : "block",
            }}
          >
            <ClickAwayListener onClickAway={handleClickAwayFromSearchRegion}>
              <div id="searchinputmain">
                <input
                  className={colorSelector ? "searchInputDark" : "searchInput"}
                  value={menuText}
                  onChange={handelRegionChange}
                  onFocus={handelMenuFocus}
                />
                {showMenuBar && (
                  <div className="selectorMenu">
                    {filterRegionData.length > 0 &&
                      filterRegionData.map((item, index) => {
                        return (
                          <p onClick={handelMenuClick} key={index}>
                            {item}
                          </p>
                        );
                      })}
                  </div>
                )}
                <ExpandMoreIcon
                  id={colorSelector ? "searchinputiconDark" : "searchinputicon"}
                  onClick={handelSelector}
                />
              </div>
            </ClickAwayListener>
          </Grid>

          {/* advance search and search button */}

          <Grid item xs={advanceSearch ? 6 : 12}>
            <Button
              style={{
                height: "41px",
                width: "100%",
                fontWeight: "bold",
                color: !colorSelector ? "#3F51B5" : "white",
              }}
              onClick={() => setAdvanceSearch(!advanceSearch)}
            >
              Advance Search
            </Button>
          </Grid>

          <Grid
            item
            xs={6}
            style={{
              justifyContent: "center",
              paddingRight: "5px",
              zIndex: showMenuBar ? "0" : "5",
              display: advanceSearch ? "block" : "none",
            }}
            className="showVisiblity"
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                height: "41px",
                width: "100%",
                background: !colorSelector ? "#3F51B5" : "#3F51B5",
              }}
            >
              Search
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: !advanceSearch ? "flex" : "none",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Tabs
              onChange={handleChange}
              textColor="primary"
              TabIndicatorProps={{
                style: {
                  display: "none",
                },
              }}
              // variant="scrollable"
              aria-label="scrollable auto tabs example"
              id="desktopTab"
              value={value}
            >
              {["All", "Music", "Movies", "Sports", "Gaming"].map(
                (item, index) => {
                  return (
                    <Tab
                      label={item}
                      key={index}
                      id={value === index ? "tabStyleActive" : "tabStyle"}
                    />
                  );
                }
              )}
            </Tabs>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              paddingRight: "4%",
              display: advanceSearch ? "block" : "none",
            }}
          >
            <ClickAwayListener onClickAway={handleClickAway}>
              <div id="searchinputmain">
                <input
                  placeholder="2021-04-22"
                  className={colorSelector ? "searchInputDark" : "searchInput"}
                  value={calander !== null ? calander : ""}
                  onChange={handelCalanderChange}
                />
                <ExpandMoreIcon
                  id={colorSelector ? "searchinputiconDark" : "searchinputicon"}
                  onClick={handelCalanderShow}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    display: showCalander ? "flex" : "none",
                  }}
                >
                  <Calendar onClickDay={handelDayClick} maxDate={new Date()} />
                </div>
              </div>
            </ClickAwayListener>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: advanceSearch ? "block" : "none",
              paddingRight: "4%",
            }}
          >
            <div id="searchinputmain">
              <input
                placeholder="Global Top 20 Search"
                className={colorSelector ? "searchInputDark" : "searchInput"}
              />
              <SearchIcon
                id={colorSelector ? "searchinputiconDark" : "searchinputicon"}
              />
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: advanceSearch ? "block" : "none",
              paddingRight: "4%",
            }}
          >
            <CustomSelectorWithTick
              filterData={filterRegionData}
              colorSelector={colorSelector}
              regionData={regionData}
              getListRegions={(value) => {
                setListOfRegions(value);
              }}
            />
          </Grid>

          <style>{`
        #tabStyleActive {
          border-radius: 50px;
          margin-left: 4px;
          margin-right: 4px;
          min-width: 50px;
          min-height: 10px;
       
         background:${colorSelector ? "#3f51b5" : "#3f51b5"}; 
          font-size: 10px;
        
          color: white;
          box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
            0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
        }
        #tabStyle {
          border-radius: 50px;
        
          background: white;
          margin-left: 4px;
          margin-right: 4px;
          min-height: 10px;
          min-width: 50px;
        
          color: black;
          box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
            0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          font-size: 10px;
        }

`}</style>
        </Grid>
      </Hidden>
    </>
  );
};

export default SearchingSection;
