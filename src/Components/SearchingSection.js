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
  getAdvanceSearchResult,
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
import CustomSelector from "./CustomComponents/CustomSelector";
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
  const [tabText, setTabText] = useState("All");

  const [customTags, setCustomTags] = useState("");

  let handelCustomTagsChanges = (e) => {
    setCustomTags(e.target.value);
  };

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
    setTimeout(() => {
      setLoadBackdrop(false);
    }, 3000);
  }, []);

  useEffect(() => {
    let dateValue = moment().format("yyyy-MM-DD");
    setCalander(dateValue);
  }, []);
  const [showMenuBar, setshowMenuBar] = useState(false);

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
        setLoadBackdrop(true);
        let { data } = await getRegionalGlobalHot20List(text);
        dispatch(hot20DataAction(data.Data));
        setTimeout(() => {
          setLoadBackdrop(false);
        }, 1000);
      } else {
        setLoadBackdrop(true);
        let { data } = await getGlobalHot20List();
        dispatch(hot20DataAction(data.Data));
        setTimeout(() => {
          setLoadBackdrop(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setLoadBackdrop(false);
    }
  };

  let regionalTop20 = async (text) => {
    try {
      if (text !== "Global") {
        setLoadBackdrop(true);
        let { data } = await getRegionalGlobalTop20List(text);
        dispatch(top20DataAction(data.Data));
        setTimeout(() => {
          setLoadBackdrop(false);
        }, 1000);
      } else {
        setLoadBackdrop(true);
        let { data } = await getGlobalTop20List();
        setTimeout(() => {
          setLoadBackdrop(false);
        }, 1000);
        dispatch(top20DataAction(data.Data));
      }
    } catch (error) {
      console.log(error);
      setLoadBackdrop(false);
    }
  };
  let handleClickAway = () => {
    if (showCalander) {
      setShowCalander(false);
    }
  };

  let getCustomSearch = async (
    customDate,
    listOfSelectedRegions,
    tagsInput
  ) => {
    try {
      setLoadBackdrop(true);

      let { data } = await getAdvanceSearchResult(
        customDate,
        listOfSelectedRegions,
        tagsInput
      );

      dispatch(hot20DataAction(data.Data.hot20.Data));
      dispatch(top20DataAction(data.Data.top20.Data));

      setTimeout(() => {
        setLoadBackdrop(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoadBackdrop(false);
    }
  };

  let handelSearch = () => {
    getCustomSearch(
      calander,
      listOfRegions,
      customTags === "" ? "All" : customTags
    );
  };

  let updateAllData = (e) => {
    regionalTop20(e);
    regionalHot20(e);
  };
  useEffect(() => {
    getRegions();
  }, []);
  let handelCalanderChange = () => {};
  const [filterRegionData, setFilterRegionData] = useState([]);

  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    let tabsArray = ["All", "Music", "Movies", "Sports", "Gaming"];

    setValue(newValue);
    setTabText(tabsArray[newValue]);
  };

  useEffect(() => {
    getCustomSearch(moment().format("yyyy-MM-DD"), "Global", tabText);
  }, [tabText]);
  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <Backdrop className={classes.backdrop} open={loadBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>

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
            <CustomSelector
              filterData={filterRegionData}
              colorSelector={colorSelector}
              regionData={regionData}
              updateData={(value) => {
                updateAllData(value);
              }}
            />
          </Grid>

          {/* advance search and search button */}

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
          <Grid item xs={12}>
            <Button
              style={{
                height: "41px",
                width: "100%",
                fontWeight: "bold",
                color: !colorSelector ? "#3F51B5" : "white",
                marginTop: !advanceSearch ? "-40px" : "0px",
                marginBottom: advanceSearch ? "-5px" : "-15px",
              }}
              onClick={() => setAdvanceSearch(!advanceSearch)}
            >
              {!advanceSearch ? "Advance Search" : "Basic Search"}
            </Button>
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
              zIndex: showCalander ? "0" : "500",
            }}
          >
            <CustomSelectorWithTick
              filterData={filterRegionData}
              colorSelector={colorSelector}
              regionData={regionData}
              updateCountries={(value) => {
                setListOfRegions(value);
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: advanceSearch ? "block" : "none",
              paddingRight: "4%",
              zIndex: "0",
            }}
          >
            <div id="searchinputmain">
              <input
                placeholder="Search Custom Tag"
                className={colorSelector ? "searchInputDark" : "searchInput"}
                onChange={handelCustomTagsChanges}
                value={customTags}
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
              justifyContent: "center",
              paddingRight: "5px",
              zIndex: showMenuBar ? "0" : "5",
              display: advanceSearch ? "block" : "none",
              marginBottom: "10px",
            }}
            className="showVisiblity"
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                height: "41px",
                width: "100%",
                background: !colorSelector ? "#3F51B5" : "#616161",
              }}
              onClick={handelSearch}
            >
              Search
            </Button>
          </Grid>

          <style>{`
        #tabStyleActive {
          border-radius: 50px;
          margin-left: 4px;
          margin-right: 4px;
          min-width: 50px;
          min-height: 10px;
       
         background:${colorSelector ? "#616161" : "#3f51b5"}; 
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
