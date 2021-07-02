import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Hidden } from "@material-ui/core";

import { getUniqueRegions, getUserLocation } from "../Services/GlobalServices";

import { useDispatch, useSelector } from "react-redux";
import {
  top20DataAction,
  hot20DataAction,
  regionsDataAction,
  setTabValue,
  setCallUserLocation,
  getGlobalTrending,
} from "../action/GlobalAction";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CustomSelectorWithTick from "./CustomComponents/CustomSelectorWithTick";
import CustomSelector from "./CustomComponents/CustomSelector";
import { globalSearch } from "../Functions/GlobalFunctions";
import CustomSearchWithTags from "./CustomComponents/CustomSearchWithTags";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import colorIcon from "./images/color.svg";
import darkIcon from "./images/dark.svg";
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

const SearchingSection = () => {
  const dispatch = useDispatch();
  const locationNeed = useSelector(
    (state) => state.globalData.callUserLocation
  );
  const classes = useStyles();
  const [loadBackdrop, setLoadBackdrop] = useState(false);
  const colorSelector = useSelector((state) => state.globalData.colorState);
  const [listOfRegions, setListOfRegions] = useState([]);
  const [tabText, setTabText] = useState("All");

  const [customTags, setCustomTags] = useState("");

  const [userCountry, setUserCountry] = useState("");

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
  const top20Data = useSelector((state) => state.globalData.top20Videos);

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
    let dateValue = moment().format("yyyy-MM-DD");
    setCalander(dateValue);
  }, []);
  const [showMenuBar, setshowMenuBar] = useState(false);

  const regionData = useSelector((state) => state.globalData.regions);

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

  let handelSearch = () => {
    getTodaysVideo(
      calander,
      listOfRegions,
      customTags === "" ? "All" : customTags
    );
  };
  const [selectorRegion, setSelectorRegion] = useState("Global");

  let updateAllData = (e, reloadText) => {
    setSelectorRegion(e);
    getTodaysVideo(moment().format("yyyy-MM-DD"), e, "All", reloadText);

    setValue(0);
  };

  useEffect(() => {
    if (locationNeed) {
      getRegions();
    }
  }, []);
  let handelCalanderChange = () => {};
  const [filterRegionData, setFilterRegionData] = useState([]);
  const tabValue = useSelector((state) => state.globalData.tabValue);

  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(tabValue);
  }, [tabValue]);

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

  let updateSearchTags = (value) => {
    setCustomTags(value);
  };

  const [tabToolTip, setTabToolTip] = useState(false);

  let handleClickAwayTabToolTip = () => {
    setTabToolTip(false);
  };

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
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
              colorSelector={colorSelector}
              regionData={regionData}
              locationMenuText={userCountry}
              updateData={(value1, value2) => {
                updateAllData(value1, value2);
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
            {colorSelector ? (
              <ClickAwayListener onClickAway={handleClickAwayTabToolTip}>
                <BlackOnGreenTooltip
                  title="These buttons search (viral videos) by #hashtag within the region selected.  For more results select Global (top of the list) from the drop down menu."
                  arrow
                  TransitionComponent={Zoom}
                  open={tabToolTip}
                >
                  <img
                    src={colorIcon}
                    style={{
                      marginRight: "10px",
                    }}
                    className="infoIconClass"
                    onClick={() => setTabToolTip(true)}
                  />
                </BlackOnGreenTooltip>
              </ClickAwayListener>
            ) : (
              <ClickAwayListener onClickAway={handleClickAwayTabToolTip}>
                <BlueOnGreenTooltip
                  title="These buttons search (viral videos) by #hashtag within the region selected.  For more results select Global (top of the list) from the drop down menu."
                  arrow
                  TransitionComponent={Zoom}
                  open={tabToolTip}
                >
                  <img
                    src={darkIcon}
                    style={{
                      marginRight: "10px",
                    }}
                    className="infoIconClass"
                    onClick={() => setTabToolTip(true)}
                  />
                </BlueOnGreenTooltip>
              </ClickAwayListener>
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
          <Grid item xs={12}>
            <Button
              style={{
                height: "41px",
                width: "100%",
                fontWeight: "bold",
                color: !colorSelector ? "#3F51B5" : "white",
                marginTop: !advanceSearch ? "-40px" : "0px",
                marginBottom: advanceSearch ? "-5px" : "-15px",
                border: colorSelector ? "2px solid white" : "2px solid #3F51B5",
              }}
              onClick={() => setAdvanceSearch(!advanceSearch)}
            >
              {!advanceSearch ? "Advanced Search" : "Basic Search"}
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
              colorSelector={colorSelector}
              regionData={regionData}
              locationMenuText={userCountry}
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
            {/* <div id="searchinputmain">
              <input
                placeholder="Search Custom Tag"
                className={colorSelector ? "searchInputDark" : "searchInput"}
                onChange={handelCustomTagsChanges}
                value={customTags}
              />
              <SearchIcon
                id={colorSelector ? "searchinputiconDark" : "searchinputicon"}
              />
            </div> */}
            <CustomSearchWithTags
              colorSelector={colorSelector}
              updateMenuText={(value) => updateSearchTags(value)}
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              justifyContent: "center",
              paddingRight: "5px",

              display: advanceSearch ? "block" : "none",
              marginBottom: "10px",
            }}
            className="showVisiblity mobileSearchButton"
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
          margin-left: 2px;
          margin-right: 2px;
          min-width: 40px;
          min-height: 10px;
       
         background:${colorSelector ? "#616161" : "#3f51b5"}; 
          font-size: 8px;
        
          color: white;
          box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
            0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
        }
        #tabStyle {
          border-radius: 50px;
        
          background: white;
          margin-left: 2px;
          margin-right: 2px;
          min-height: 10px;
          min-width: 40px;
        
          color: black;
          box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
            0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          font-size: 8px;
        }
       .infoIconClass{
         width:25px;
         height:25px;
       }


        @media only screen and (max-width: 355px) {
        
          #tabStyleActive {
            border-radius: 40px;
            margin-left: 1px;
            margin-right: 1px;
            min-width: 30px;
            min-height: 7px;
            background:${colorSelector ? "#616161" : "#3f51b5"}; 
            font-size: 6px;
            color: white;
            box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          }
          #tabStyle {
            border-radius: 40px;
            background: white;
            margin-left: 2px;
            margin-right: 2px;
            min-width: 30px;
            min-height: 7px;
          
            color: black;
            box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
            font-size: 8px;
          }
        }
        @media only screen and (max-width: 280px) {
          .infoIconClass{
            width:23px;
            height:23px;
          }
          #tabStyleActive {
            border-radius: 20px;
            margin-left: 1px;
            margin-right: 1px;
            min-width: 20px;
            min-height: 7px;
            background:${colorSelector ? "#616161" : "#3f51b5"}; 
            font-size: 5px;
            color: white;
            box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          }
          #tabStyle {
            border-radius: 20px;
            background: white;
            margin-left: 1px;
            margin-right: 1px;
            min-width: 15px;
            min-height: 6px;
          
            color: black;
            box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
            font-size: 5px;
          }
        }
        @media screen and (max-width: 1024px) and (min-width: 768px) {
       
        
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
        

`}</style>
        </Grid>
      </Hidden>
    </>
  );
};

export default SearchingSection;
