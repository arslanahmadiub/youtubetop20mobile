import React from "react";
import { Grid } from "@material-ui/core";
const Footer = () => {
  return (
    <Grid container style={{ background: "#3f51b5" }}>
      <Grid
        item
        xs={12}
        style={{
          paddingLeft: "25px",
          paddingRight: "25px",
          paddingTop: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "white" }}>YoutubeTop20</h2>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ paddingLeft: "25px", paddingRight: "25px", marginTop: "10px" }}
      >
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4 style={{ color: "white" }}>About Us</h4>

            <h4 style={{ color: "white", marginTop: "10px" }}>Advertise</h4>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4 style={{ color: "white" }}>Charities</h4>

            <h4 style={{ color: "white", marginTop: "10px" }}>Analysis</h4>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h4 style={{ color: "white", marginTop: "15px" }}>
              {" "}
              Copnyright @ 2021 YoutubeTop20
            </h4>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
