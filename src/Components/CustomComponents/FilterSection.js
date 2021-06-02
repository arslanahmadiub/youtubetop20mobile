import React from "react";
import { Grid } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Hidden } from "@material-ui/core";

export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Hidden only={["md", "lg", "xl"]}>
      <Grid
        container
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <Grid item xs={12}>
          {/* <Tabs
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
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
          </Tabs> */}

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
    </Hidden>
  );
}
