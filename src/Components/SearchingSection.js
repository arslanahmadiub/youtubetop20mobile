import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Hidden } from "@material-ui/core";

import { getUniqueRegions } from "../Services/GlobalServices";

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
import { globalSearch } from "../Functions/GlobalFunctions";

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

  let updateAllData = (e) => {
    setSelectorRegion(e);
    getTodaysVideo(moment().format("yyyy-MM-DD"), e, "All");

    setValue(0);
  };
  useEffect(() => {
    getRegions();
    getTodaysVideo(moment().format("yyyy-MM-DD"), "Global", "All");
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
    getTodaysVideo(moment().format("yyyy-MM-DD"), selectorRegion, tabText);
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

        @media only screen and (max-width: 355px) {
        
          #tabStyleActive {
            border-radius: 40px;
            margin-left: 2px;
            margin-right: 2px;
            min-width: 30px;
            min-height: 7px;
            background:${colorSelector ? "#616161" : "#3f51b5"}; 
            font-size: 8px;
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
        
          #tabStyleActive {
            border-radius: 20px;
            margin-left: 1px;
            margin-right: 1px;
            min-width: 30px;
            min-height: 7px;
            background:${colorSelector ? "#616161" : "#3f51b5"}; 
            font-size: 7px;
            color: white;
            box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
          }
          #tabStyle {
            border-radius: 20px;
            background: white;
            margin-left: 1px;
            margin-right: 1px;
            min-width: 30px;
            min-height: 6px;
          
            color: black;
            box-shadow: 1px 2px 1px -1px rgb(0 0 0 / 20%),
              0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
            font-size: 7px;
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
