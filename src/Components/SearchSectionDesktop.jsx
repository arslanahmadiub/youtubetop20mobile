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
import { getUniqueRegions } from "../Services/GlobalServices";
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
import CustomSearchWithTags from "./CustomComponents/CustomSearchWithTags";
import { globalSearch } from "../Functions/GlobalFunctions";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SearchSectionDesktop = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loadBackdrop, setLoadBackdrop] = useState(false);
  const [tabText, setTabText] = useState("All");

  const colorSelector = useSelector((state) => state.globalData.colorState);
  const [customTags, setCustomTags] = useState("");
  const [value, setValue] = useState(0);
  const [calander, setCalander] = useState(null);
  const [showCalander, setShowCalander] = useState(false);
  let handelDayClick = (e) => {
    let dateValue = moment(e).format("yyyy-MM-DD");
    setCalander(dateValue);
    setShowCalander(false);
  };

  let handelCustomTagsChanges = (e) => {
    setCustomTags(e.target.value);
  };

  useEffect(() => {
    let dateValue = moment().format("yyyy-MM-DD");
    setCalander(dateValue);
  }, []);

  let handelCalanderShow = () => {
    setShowCalander(!showCalander);
  };

  const handleChange = (event, newValue) => {
    let tabsArray = ["All", "Music", "Movies", "Sports", "Gaming"];
    setValue(newValue);
    setTabText(tabsArray[newValue]);
  };

  const [showMenuBar, setshowMenuBar] = useState(false);

  let handelCalanderChange = () => {};

  const regionData = useSelector((state) => state.globalData.regions);

  const [filterRegionData, setFilterRegionData] = useState([]);

  let getRegions = async () => {
    try {
      let { data } = await getUniqueRegions();

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

  let getTodaysVideo = async (customDate, customRegion, customTag) => {
    try {
      setLoadBackdrop(true);

      let result = await globalSearch(customDate, customRegion, customTag);
      dispatch(top20DataAction(result.Data.top20.Data));
      dispatch(hot20DataAction(result.Data.hot20.Data));
      setTimeout(() => {
        setLoadBackdrop(false);
      }, 2000);
    } catch (error) {
      setLoadBackdrop(false);
    }
  };

  useEffect(() => {
    getRegions();
    getTodaysVideo(moment().format("yyyy-MM-DD"), "Global", "All");
  }, []);

  const [advanceSearch, setAdvanceSearch] = useState(true);
  const [listOfRegions, setListOfRegions] = useState([]);

  const topFilterSection = useRef();
  const searchingSectionRef = useRef();

  const [selectorRegion, setSelectorRegion] = useState("Global");

  let updateAllData = (e) => {
    setSelectorRegion(e);
    getTodaysVideo(moment().format("yyyy-MM-DD"), e, "All");

    setValue(0);
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

  let handelSearch = () => {
    getTodaysVideo(
      calander,
      listOfRegions,
      customTags === "" ? "All" : customTags
    );
  };

  useEffect(() => {
    getTodaysVideo(moment().format("yyyy-MM-DD"), selectorRegion, tabText);
  }, [tabText]);

  let updateSearchTags = (value) => {
    setCustomTags(value);
  };

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
              xs={6}
              style={{ display: !advanceSearch ? "none" : "block" }}
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
            <Grid item xs={6}>
              <Button
                style={{
                  height: "41px",
                  width: "100%",
                  fontWeight: "bold",
                  color: !colorSelector ? "#3F51B5" : "white",
                }}
                onClick={() => setAdvanceSearch(!advanceSearch)}
              >
                {advanceSearch ? "Advanced Search" : "Basic Search"}
              </Button>
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                justifyContent: "center",
                paddingRight: "5px",
                zIndex: showMenuBar ? "0" : "5",
                display: !advanceSearch ? "block" : "none",
              }}
              // className="showVisiblity"
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  height: "41px",
                  width: "100%",
                  background: !colorSelector ? "#3F51B5" : "#424242",
                }}
                onClick={handelSearch}
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
                  updateCountries={(value) => {
                    setListOfRegions(value);
                  }}
                />
              </Grid>
              <Grid item xs={4} style={{ zIndex: "500" }}>
                {/* <div id="searchinputmain">
                  <input
                    placeholder="Search Custom Tag"
                    className={
                      colorSelector ? "searchInputDark" : "searchInput"
                    }
                    onChange={handelCustomTagsChanges}
                    value={customTags}
                  />
                  <SearchIcon
                    id={
                      colorSelector ? "searchinputiconDark" : "searchinputicon"
                    }
                  />
                </div> */}
                <CustomSearchWithTags
                  colorSelector={colorSelector}
                  updateMenuText={(value) => updateSearchTags(value)}
                />
              </Grid>
            </Grid>
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
       
         background:${colorSelector ? "#424242" : "#3f51b5"}; 
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

        @media screen and (max-width: 1366px) and (min-width: 1024px) {
       
        
          #tabStyleActive {
            border-radius: 50px;
            margin-left: 7px;
            margin-right: 7px;
            min-width: 100px;
            min-height: 10px;
         
           background:${colorSelector ? "#424242" : "#3f51b5"}; 
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
            min-width: 100px;
          
            color: black;
            box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
            font-size: 16px;
          }
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
