import React from "react";
import { Grid } from "@material-ui/core";
import { Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Footer = () => {
  let history = useHistory();
  let handelAboutUs = () => {
    history.push("/about");
  };
  let handeHomePage = () => {
    history.push("/");
  };

  let handelPrivacyPolicy = () => {
    history.push("/privacy");
  };
  let handelCharity = () => {
    history.push("/charity");
  };

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
                <h4
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={handelAboutUs}
                >
                  About Us
                </h4>
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
                <h4
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={handelCharity}
                >
                  Charities
                </h4>
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
        <Grid
          container
          style={{
            background: "#3f51b5",
            marginTop: "25px",
          }}
        >
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
            <h2
              style={{ color: "white", cursor: "pointer" }}
              onClick={handeHomePage}
            >
              GlobalTop20
            </h2>
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
                  <h4
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={handelAboutUs}
                  >
                    About Us
                  </h4>

                  <h4
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={handelPrivacyPolicy}
                  >
                    Privacy policy
                  </h4>
                  <h4
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={handelCharity}
                  >
                    Charities
                  </h4>
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
