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
        <Grid item xs={11}>
          <Tabs
            onChange={handleChange}
            indicatorColor="#F5F5F5"
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
          </Tabs>
        </Grid>
      </Grid>
    </Hidden>
  );
}
