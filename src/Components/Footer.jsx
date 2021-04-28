import React from "react";
import { Grid } from "@material-ui/core";
import { Hidden } from "@material-ui/core";

const Footer = () => {
  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
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
            <h2 style={{ color: "white" }}>GlobalTop20</h2>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              paddingLeft: "25px",
              paddingRight: "25px",
              marginTop: "10px",
            }}
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
                <h4 style={{ color: "white" }}>Charaties</h4>

                <h4 style={{ color: "white", marginTop: "10px" }}>Analysis</h4>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "25px",
                }}
              >
                <h4 style={{ color: "white", marginTop: "15px" }}>
                  Copyright @ 2021 GlobalTop20
                </h4>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden only={["sm", "xs"]}>
        <Grid container style={{ background: "#3f51b5", marginTop: "25px" }}>
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
            <h2 style={{ color: "white" }}>GlobalTop20</h2>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              paddingLeft: "25px",
              paddingRight: "25px",
              marginTop: "10px",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: "20%",
                  paddingRight: "20%",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <h4 style={{ color: "white" }}>About Us</h4>

                  <h4 style={{ color: "white" }}>Advertise</h4>
                  <h4 style={{ color: "white" }}>Charaties</h4>

                  <h4 style={{ color: "white" }}>Analysis</h4>
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "25px",
                }}
              >
                <h4 style={{ color: "white", marginTop: "15px" }}>
                  Copyright @ 2021 GlobalTop20
                </h4>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};

export default Footer;
