import React, { useState, useEffect, useRef } from "react";
import { Hidden } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { getUniqueRegions, getUserLocation } from "../Services/GlobalServices";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useDispatch, useSelector } from "react-redux";
import {
  top20DataAction,
  hot20DataAction,
  regionsDataAction,
  setTabValue,
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
  const regionData = useSelector((state) => state.globalData.regions);

  const [userCountry, setUserCountry] = useState("");

  let getUserLocationData = async () => {
    try {
      setLoadBackdrop(true);

      let { data } = await getUserLocation();
      setUserCountry(data.ip.country);

      setLoadBackdrop(false);
    } catch (error) {
      setLoadBackdrop(false);
    }
  };

  const dispatch = useDispatch();
  const classes = useStyles();
  const [loadBackdrop, setLoadBackdrop] = useState(false);
  const [tabText, setTabText] = useState("All");

  const colorSelector = useSelector((state) => state.globalData.colorState);
  const tabValue = useSelector((state) => state.globalData.tabValue);
  const [customTags, setCustomTags] = useState("");
  const [value, setValue] = useState(0);

  const [calander, setCalander] = useState(null);
  const [showCalander, setShowCalander] = useState(false);

  const top20Data = useSelector((state) => state.globalData.top20Videos);

  let handelDayClick = (e) => {
    let dateValue = moment(e).format("yyyy-MM-DD");
    setCalander(dateValue);
    setShowCalander(false);
  };

  useEffect(() => {
    setValue(tabValue);
  }, [tabValue]);

  useEffect(() => {
    let dateValue = moment().format("yyyy-MM-DD");
    setCalander(dateValue);
  }, []);

  let handelCalanderShow = () => {
    setShowCalander(!showCalander);
  };

  const handleChange = (event, newValue) => {
    let tabsArray = ["All", "Music", "Movies", "Sports", "Gaming"];

    dispatch(setTabValue(newValue));
    getTodaysVideo(
      moment().format("yyyy-MM-DD"),
      selectorRegion,
      tabsArray[newValue]
    );
    setTabText(tabsArray[newValue]);
  };

  const [showMenuBar, setshowMenuBar] = useState(false);

  let handelCalanderChange = () => {};

  const [filterRegionData, setFilterRegionData] = useState([]);

  let getRegions = async () => {
    try {
      let { data } = await getUniqueRegions();

      await dispatch(regionsDataAction(data.Data));
      if (top20Data.length < 1) {
        getUserLocationData();
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

  let getTodaysVideo = async (
    customDate,
    customRegion,
    customTag,
    reload = true
  ) => {
    try {
      setLoadBackdrop(true);

      let result = await globalSearch(customDate, customRegion, customTag);

      dispatch(top20DataAction(result.Data.top20.Data));
      dispatch(hot20DataAction(result.Data.hot20.Data));
      if (reload) {
        window.location.reload();
      }
      setTimeout(() => {
        setLoadBackdrop(false);
      }, 100);
    } catch (error) {
      setLoadBackdrop(false);
    }
  };

  useEffect(() => {
    getRegions();

    if (top20Data.length < 1) {
      getTodaysVideo(moment().format("yyyy-MM-DD"), "Global", "All", false);
    }
  }, []);

  const [advanceSearch, setAdvanceSearch] = useState(true);
  const [listOfRegions, setListOfRegions] = useState([]);

  const topFilterSection = useRef();

  const [selectorRegion, setSelectorRegion] = useState("Global");

  let updateAllData = (e) => {
    setSelectorRegion(e);
    getTodaysVideo(moment().format("yyyy-MM-DD"), e, "All");
  };

  let handelSearch = () => {
    getTodaysVideo(
      calander,
      listOfRegions,
      customTags === "" ? "All" : customTags
    );
  };

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
            spacing={3}
          >
            <Grid
              container
              style={{
                padding: "8px",
                background: colorSelector ? "#616161" : "white",
                display: advanceSearch ? "flex" : "none",
              }}
              className="customCardWidth"
              spacing={3}
            >
              <Grid item xs={6}>
                <CustomSelector
                  filterData={filterRegionData}
                  colorSelector={colorSelector}
                  regionData={regionData}
                  locationMenuText={userCountry}
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
                    border: "2px solid white",
                  }}
                  onClick={() => setAdvanceSearch(!advanceSearch)}
                >
                  Advanced Search
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
            </Grid>

            {/* end top section */}

            {/* bottom section */}

            <Grid
              container
              spacing={3}
              style={{
                paddingRight: "13px",
                paddingLeft: "13px",
                display: !advanceSearch ? "flex" : "none",
                background: colorSelector ? "#616161" : "white",
              }}
              className="customCardWidth"
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
                <CustomSearchWithTags
                  colorSelector={colorSelector}
                  updateMenuText={(value) => updateSearchTags(value)}
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  style={{
                    height: "41px",
                    width: "100%",
                    fontWeight: "bold",
                    color: !colorSelector ? "#3F51B5" : "white",
                    border: "2px solid white",
                  }}
                  onClick={() => setAdvanceSearch(!advanceSearch)}
                >
                  Basic Search
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  paddingRight: "5px",
                  zIndex: showMenuBar ? "0" : "5",
                }}
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
            </Grid>

            {/* End bottom section */}
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
