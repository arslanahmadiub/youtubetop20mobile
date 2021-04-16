import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
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
          marginTop: "10px",
        }}
      >
        <Grid item xs={11}>
          <Tabs
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
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
