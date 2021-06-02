import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import image1 from "./images/1.jpg";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.jpg";
import { Hidden } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { useSelector } from "react-redux";
const Banner = () => {
  const colorSelector = useSelector((state) => state.globalData.colorState);

  let onDark = {
    background: "#616161",
    color: "white",
  };
  let onWhite = {
    background: "white",
    color: "black",
  };

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <Grid container className="bannerMainContainer" spacing={0}>
          <Grid
            item
            xs={6}
            className="bannerInnerContainer"
            container
            spacing={0}
          >
            <img src={image1} alt="banner" className="bannerImage" />
          </Grid>
          <Grid
            item
            xs={6}
            className="bannerInnerContainer"
            container
            spacing={0}
          >
            <img src={image2} alt="banner" className="bannerImage" />
          </Grid>
          <Grid
            item
            xs={6}
            className="bannerInnerContainer"
            container
            spacing={0}
          >
            <img src={image3} alt="banner" className="bannerImage" />
          </Grid>
          <Grid
            item
            xs={6}
            className="bannerInnerContainer"
            container
            spacing={0}
          >
            <img src={image4} alt="banner" className="bannerImage" />
          </Grid>
        </Grid>
      </Hidden>

      <Hidden only={["sm", "xs"]}>
        <Grid container className="bannerMainContainerDesktop">
          <Grid item xs={3} className="bannerInnerContainerDesktop">
            <Card style={colorSelector ? onDark : onWhite}>
              <img src={image1} alt="banner" className="bannerImageDesktop" />
              <p className="bannerImageText">Supports Charity</p>
            </Card>
          </Grid>
          <Grid item xs={3} className="bannerInnerContainerDesktop">
            <Card style={colorSelector ? onDark : onWhite}>
              <img src={image2} alt="banner" className="bannerImageDesktop" />
              <p className="bannerImageText">Supports Charity</p>
            </Card>
          </Grid>
          <Grid item xs={3} className="bannerInnerContainerDesktop">
            <Card style={colorSelector ? onDark : onWhite}>
              <img src={image3} alt="banner" className="bannerImageDesktop" />
              <p className="bannerImageText">Supports Charity</p>
            </Card>
          </Grid>
          <Grid item xs={3} className="bannerInnerContainerDesktop">
            <Card style={colorSelector ? onDark : onWhite}>
              <img src={image4} alt="banner" className="bannerImageDesktop" />
              <p className="bannerImageText">Supports Charity</p>
            </Card>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};

export default Banner;
