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
import { withStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

import colorIcon from "./images/color.svg";
import darkIcon from "./images/dark.svg";

import {
  top20DataAction,
  hot20DataAction,
  regionsDataAction,
  setTabValue,
  setCallUserLocation,
  getGlobalTrending,
  top20NewDataAction,
} from "../action/GlobalAction";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import CustomSelector from "./CustomComponents/CustomSelector";
import CustomSelectorWithTick from "./CustomComponents/CustomSelectorWithTick";
import CustomSearchWithTags from "./CustomComponents/CustomSearchWithTags";
import { globalSearch } from "../Functions/GlobalFunctions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

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

const SearchSectionDesktop = () => {
  const regionData = useSelector((state) => state.globalData.regions);

  const [userCountry, setUserCountry] = useState("");
  const locationNeed = useSelector(
    (state) => state.globalData.callUserLocation
  );

  const dispatch = useDispatch();
  const classes = useStyles();
  const [loadBackdrop, setLoadBackdrop] = useState(false);
  const [tabText, setTabText] = useState("All");

  const colorSelector = useSelector((state) => state.globalData.colorState);
  const selectorText = useSelector((state) => state.globalData.selectorText);
  const tabValue = useSelector((state) => state.globalData.tabValue);
  const [customTags, setCustomTags] = useState("");
  const [value, setValue] = useState(0);

  const [calander, setCalander] = useState(null);
  const [showCalander, setShowCalander] = useState(false);

  const top20Data = useSelector((state) => state.globalData.top20Videos);

  let getUserLocationData = async () => {
    try {
      setLoadBackdrop(true);

      let { data } = await getUserLocation();
      setUserCountry(data.ip.country);
      dispatch(setCallUserLocation(false));
    } catch (error) {
      setLoadBackdrop(false);
    }
  };

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
    if (!locationNeed) {
      getTodaysVideo(
        moment().format("yyyy-MM-DD"),
        selectorText,
        tabsArray[newValue]
      );
    }

    setTabText(tabsArray[newValue]);
  };

  const [showMenuBar, setshowMenuBar] = useState(false);

  let handelCalanderChange = () => {};

  let getRegions = async () => {
    try {
      setLoadBackdrop(true);
      let { data } = await getUniqueRegions();
      data.Data.unshift("Global");
      await dispatch(regionsDataAction(data.Data));
      if (locationNeed) {
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

  const notify = () =>
    toast.info("😢 Sorry! No Viral Videos Found For This Region.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  let getTodaysVideo = async (
    customDate,
    customRegion,
    customTag,
    reload = true
  ) => {
    try {
      setLoadBackdrop(true);

      let result = await globalSearch(customDate, customRegion, customTag);

      if (result.Data.top20.Data.length > 0) {
        let top = result.Data.top20.Data;
        let hot = result.Data.hot20.Data;
        top.forEach(function (element, index) {
          element.hotData = hot[index];
        });
        dispatch(top20NewDataAction(top));
        dispatch(top20DataAction(result.Data.top20.Data));

        dispatch(hot20DataAction(result.Data.hot20.Data));
        setTimeout(() => {
          setLoadBackdrop(false);
        }, 100);
      } else {
        notify();
        dispatch(getGlobalTrending(true));

        setTimeout(() => {
          dispatch(getGlobalTrending(false));
        }, 5000);
      }
      // if (reload) {
      //   window.location.reload();
      // }
    } catch (error) {
      setLoadBackdrop(false);
    }
  };

  useEffect(() => {
    if (locationNeed) {
      getRegions();
    }
  }, []);

  const [advanceSearch, setAdvanceSearch] = useState(true);
  const [listOfRegions, setListOfRegions] = useState([]);

  const topFilterSection = useRef();

  let updateAllData = (e, reloadText) => {
    getTodaysVideo(moment().format("yyyy-MM-DD"), e, "All", reloadText);
  };

  let handelSearch = () => {
    if (!locationNeed) {
      getTodaysVideo(
        calander,
        listOfRegions,
        customTags === "" ? "All" : customTags
      );
    }
  };

  let updateSearchTags = (value) => {
    setCustomTags(value);
  };

  return (
    <Hidden only={["sm", "xs"]}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />

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
                  colorSelector={colorSelector}
                  regionData={regionData}
                  locationMenuText={userCountry}
                  updateData={(value1, value2) => {
                    updateAllData(value1, value2);
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
                    border: colorSelector
                      ? "2px solid white"
                      : "2px solid #3F51B5",
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
                  display: "flex",

                  alignItems: "center",
                }}
                ref={topFilterSection}
                className="topFilterTab"
              >
                {colorSelector ? (
                  <BlackOnGreenTooltip
                    title="These buttons search (viral videos) by #hashtag within the region selected.  For more results select Global (top of the list) from the drop down menu."
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <img
                      src={colorIcon}
                      style={{
                        marginLeft: "10px",

                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </BlackOnGreenTooltip>
                ) : (
                  <BlueOnGreenTooltip
                    title="These buttons search (viral videos) by #hashtag within the region selected.  For more results select Global (top of the list) from the drop down menu."
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <img
                      src={darkIcon}
                      style={{
                        marginLeft: "10px",

                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </BlueOnGreenTooltip>
                )}

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
                  colorSelector={colorSelector}
                  regionData={regionData}
                  locationMenuText={userCountry}
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
                    border: colorSelector
                      ? "2px solid white"
                      : "2px solid #3F51B5",
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
