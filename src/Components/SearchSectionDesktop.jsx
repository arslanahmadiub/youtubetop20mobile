import React, { useState, useEffect, useRef } from "react";
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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { useDispatch, useSelector } from "react-redux";
import {
  top20DataAction,
  hot20DataAction,
  regionsDataAction,
} from "../action/GlobalAction";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import CustomSelector from "./CustomComponents/CustomSelector";
import CustomSelectorWithTick from "./CustomComponents/CustomSelectorWithTick";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SearchSectionDesktop = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loadBackdrop, setLoadBackdrop] = useState(true);
  const [focused, setFocused] = useState(false);
  const colorSelector = useSelector((state) => state.globalData.colorState);

  useEffect(() => {
    setTimeout(() => {
      setLoadBackdrop(false);
    }, 3000);
  }, []);

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
  const [oldMenuText, setOldMenuText] = useState("");

  let handleClickAwayFromSearchRegion = () => {
    if (showMenuBar) {
      setshowMenuBar(false);
    }
    if (menuText === "") {
      setMenuText("Global");
    }
  };

  let handelSelector = () => {
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
  let handelCalanderChange = () => {};

  const regionData = useSelector((state) => state.globalData.regions);

  const [filterRegionData, setFilterRegionData] = useState([]);

  let getRegions = async () => {
    try {
      let { data } = await getUniqueRegions();
      console.log(data);
      dispatch(regionsDataAction(data.Data));
    } catch (error) {
      console.log(error);
    }
  };

  let handleClickAway = () => {
    if (showCalander) {
      setShowCalander(false);
    }
  };

  let regionalHot20 = async (text) => {
    try {
      if (text !== "Global") {
        setLoadBackdrop(true);

        let { data } = await getRegionalGlobalHot20List(text);

        dispatch(hot20DataAction(data.Data));
        setLoadBackdrop(false);
      } else {
        setLoadBackdrop(true);

        let { data } = await getGlobalHot20List();

        dispatch(hot20DataAction(data.Data));
        setLoadBackdrop(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let regionalTop20 = async (text) => {
    try {
      if (text !== "Global") {
        setLoadBackdrop(true);

        let { data } = await getRegionalGlobalTop20List(text);
        dispatch(top20DataAction(data.Data));
        setLoadBackdrop(false);
      } else {
        setLoadBackdrop(true);

        let { data } = await getGlobalTop20List();

        dispatch(top20DataAction(data.Data));
        setLoadBackdrop(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegions();
  }, []);

  const [advanceSearch, setAdvanceSearch] = useState(true);
  const [listOfRegions, setListOfRegions] = useState([]);

  console.log(listOfRegions);

  const topFilterSection = useRef();
  const searchingSectionRef = useRef();

  let updateAllData = (e) => {
    regionalTop20(e);
    regionalHot20(e);
  };

  useEffect(() => {
    if (
      topFilterSection.current &&
      topFilterSection.current.classList.contains("topFilterTab")
    ) {
      searchingSectionRef.current.classList.add(
        "searchingContainerAfterHidden"
      );
      topFilterSection.current.classList.remove("topFilterTab");
      topFilterSection.current.classList.add("topFilterTabHidden");

      setTimeout(() => {
        topFilterSection.current.classList.remove("topFilterTabHidden");
        topFilterSection.current.classList.add("topFilterTabDisplayNone");
        searchingSectionRef.current.classList.remove(
          "searchingContainerAfterHidden"
        );
      }, 500);
    } else if (
      topFilterSection.current &&
      topFilterSection.current.classList.contains("topFilterTabDisplayNone")
    ) {
      searchingSectionRef.current.classList.add(
        "searchingContainerAfterHidden"
      );

      topFilterSection.current.classList.remove("topFilterTabDisplayNone");
      topFilterSection.current.classList.add("topFilterTabDisplayFlex");

      setTimeout(() => {
        topFilterSection.current.classList.remove("topFilterTabDisplayFlex");
        topFilterSection.current.classList.add("topFilterTab");
      }, 500);
    }
  }, [advanceSearch]);

  useEffect(() => {
    if (
      searchingSectionRef.current &&
      searchingSectionRef.current.classList.contains(
        "searchingContainerBeforeHidden"
      )
    ) {
      setTimeout(() => {
        searchingSectionRef.current.classList.add(
          "searchingContainerBeforeVisible"
        );
        searchingSectionRef.current.classList.remove(
          "searchingContainerBeforeHidden"
        );
      }, 500);
    } else if (
      searchingSectionRef.current &&
      searchingSectionRef.current.classList.contains(
        "searchingContainerBeforeVisible"
      )
    ) {
      searchingSectionRef.current.classList.add(
        "searchingContainerAfterHidden"
      );
      searchingSectionRef.current.classList.remove(
        "searchingContainerBeforeVisible"
      );

      searchingSectionRef.current.classList.add(
        "searchingContainerBeforeHidden"
      );
    }
  }, [advanceSearch]);

  return (
    <Hidden only={["sm", "xs"]}>
      <Backdrop className={classes.backdrop} open={loadBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container className="searchSectionMainContainerDesktop">
        <Grid item xs={12}>
          <Grid
            container
            style={{
              padding: "8px",
              background: colorSelector ? "#616161" : "white",
            }}
            className={advanceSearch ? "customCardWidth" : "customCard"}
            spacing={3}
          >
            <Grid
              item
              xs={5}
              style={{ display: !advanceSearch ? "none" : "block" }}
            >
              {/* <ClickAwayListener onClickAway={handleClickAwayFromSearchRegion}>
                <div id="searchinputmain">
                  <input
                    className={
                      colorSelector ? "searchInputDark" : "searchInput"
                    }
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
                    id={
                      colorSelector ? "searchinputiconDark" : "searchinputicon"
                    }
                    onClick={handelSelector}
                  />
                </div>
              </ClickAwayListener> */}
              <CustomSelector
                filterData={filterRegionData}
                colorSelector={colorSelector}
                regionData={regionData}
                updateData={(value) => {
                  updateAllData(value);
                }}
              />
            </Grid>
            <Grid item xs={advanceSearch ? 3 : 6}>
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
              xs={advanceSearch ? 4 : 6}
              style={{
                justifyContent: "center",
                paddingRight: "5px",
                zIndex: showMenuBar ? "0" : "5",
              }}
              // className="showVisiblity"
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
                zIndex: showMenuBar ? "0" : "5",
              }}
              ref={topFilterSection}
              className="topFilterTab"
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
              container
              spacing={3}
              style={{
                paddingRight: "13px",
                paddingLeft: "13px",
              }}
              ref={searchingSectionRef}
              className="searchingContainerBeforeHidden"
            >
              <Grid item xs={4} style={{ zIndex: showMenuBar ? "0" : "5" }}>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div id="searchinputmainDesktop">
                    <input
                      placeholder="2021-04-22"
                      className={
                        colorSelector ? "searchInputDark" : "searchInput"
                      }
                      value={calander !== null ? calander : ""}
                      onChange={handelCalanderChange}
                    />
                    <ExpandMoreIcon
                      id={
                        colorSelector
                          ? "searchinputiconDark"
                          : "searchinputicon"
                      }
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
                      <Calendar
                        maxDate={new Date()}
                        onClickDay={handelDayClick}
                      />
                    </div>
                  </div>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={4}>
                <CustomSelectorWithTick
                  filterData={filterRegionData}
                  colorSelector={colorSelector}
                  regionData={regionData}
                  getListRegions={(value) => {
                    setListOfRegions(value);
                  }}
                />
              </Grid>
              <Grid item xs={4} style={{ zIndex: showMenuBar ? "0" : "5" }}>
                <div id="searchinputmain">
                  <input
                    placeholder="Global Top 20 Search"
                    className={
                      colorSelector ? "searchInputDark" : "searchInput"
                    }
                  />
                  <SearchIcon
                    id={
                      colorSelector ? "searchinputiconDark" : "searchinputicon"
                    }
                  />
                </div>
              </Grid>
            </Grid>
            {/* <Grid
              item
              xs={12}
              style={{
                zIndex: showMenuBar ? "0" : "5",
                display: advanceSearch ? "flex" : "none",
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
            </Grid> */}
          </Grid>
        </Grid>

        <style>{`.showVisiblity{
          visibility: ${advanceSearch ? "visible" : "hidden"};
          opacity: ${advanceSearch ? "1" : "0"};
          transition: visibility 0.5s,  opacity 0.5s linear;
          transition-delay: ${advanceSearch ? "0.5s" : "0s"};

        }


        
        .customCard {
          box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
            0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          background: whitesmoke;
          border-radius: 5px;
          height: 150px;
          transition:  height 0.5s;
          transition-delay: 0.5s;

        }
        .customCardWidth {
          box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
          0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
        background: whitesmoke;
        border-radius: 5px;
       
        height: 150px;
        transition:  height 0.5s;
        }
        #tabStyleActive {
          border-radius: 50px;
          margin-left: 7px;
          margin-right: 7px;
          min-width: 200px;
          min-height: 10px;
       
         background:${colorSelector ? "#3f51b5" : "#3f51b5"}; 
          font-size: 16px;
        
          color: white;
          box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
            0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
        }
        #tabStyle {
          border-radius: 50px;
        
          background: white;
          margin-left: 7px;
          margin-right: 7px;
          min-height: 10px;
          min-width: 200px;
        
          color: black;
          box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
            0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          font-size: 16px;
        }
        .topFilterTab{

          visibility:  visible ;
          opacity:  1;
          display: flex;
      
          width: 100%;
          justify-content: center;
        
          transition: all 0.5s linear;


        }
        .topFilterTabHidden{
          opacity:  0;
          display: flex;
      
          width: 100%;
          justify-content: center;
          transition: all 0.5s linear;

        }
        .topFilterTabDisplayNone{
          display: none;
          opacity:  1;

        }
        .topFilterTabDisplayFlex{
          visibility:  hidden ;
          opacity:  0;
          display: flex;
      
          width: 100%;
          justify-content: center;
        
          transition: all 0.5s linear;


        }


        .searchingContainerBeforeHidden{
          display:  flex;
          visibility:  hidden ;
          opacity:  0;
          transition: all 0.5s linear;

        }
        .searchingContainerBeforeVisible{
          display:  flex;
          visibility:  visible ;
          opacity:  1;
          transition: all 0.5s linear;
        }
        .searchingContainerAfterHidden{
          display:  none;
          visibility:  hidden ;
          opacity:  0;
         
        }
        .searchingContainerAfterVisible{
          display:  flex;
          visibility:  visible ;
          opacity:  1;
          transition: all 0.5s linear;
        }


`}</style>
      </Grid>
    </Hidden>
  );
};

export default SearchSectionDesktop;
