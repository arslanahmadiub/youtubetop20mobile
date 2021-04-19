import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Hidden } from "@material-ui/core";

const SearchingSection = () => {
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

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <Grid container>
          <Grid item xs={8}>
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
        </Grid>
        <br />
        <Grid container>
          <Grid item xs={6}>
            <div id="searchinputmain">
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
                }}
              >
                <Calendar onClickDay={handelDayClick} />
              </div>
            </div>
          </Grid>
          <Grid item xs={6} style={{ paddingRight: "15px" }}>
            <div id="searchinputmain">
              <select name="cars" id="cars" className="searchSelector">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              {/* <ExpandMoreIcon id="searchinputicon" /> */}
            </div>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};

export default SearchingSection;
