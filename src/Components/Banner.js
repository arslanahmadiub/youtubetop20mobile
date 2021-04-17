import React from "react";
import { Grid } from "@material-ui/core";
import image1 from "./images/1.jpg";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.jpg";
import { Hidden } from "@material-ui/core";
import Card from "@material-ui/core/Card";

const Banner = () => {
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
            <img src={image1} alt="banner-image" className="bannerImage" />
          </Grid>
          <Grid
            item
            xs={6}
            className="bannerInnerContainer"
            container
            spacing={0}
          >
            <img src={image2} alt="banner-image" className="bannerImage" />
          </Grid>
          <Grid
            item
            xs={6}
            className="bannerInnerContainer"
            container
            spacing={0}
          >
            <img src={image3} alt="banner-image" className="bannerImage" />
          </Grid>
          <Grid
            item
            xs={6}
            className="bannerInnerContainer"
            container
            spacing={0}
          >
            <img src={image4} alt="banner-image" className="bannerImage" />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden only={["sm", "xs"]}>
        <Grid container className="bannerMainContainerDesktop">
          <Grid item xs={3} className="bannerInnerContainerDesktop">
            <Card>
              <img
                src={image1}
                alt="banner-image"
                className="bannerImageDesktop"
              />
              <p className="bannerImageText">Supports Charity</p>
            </Card>
          </Grid>
          <Grid item xs={3} className="bannerInnerContainerDesktop">
            <Card>
              <img
                src={image2}
                alt="banner-image"
                className="bannerImageDesktop"
              />
              <p className="bannerImageText">Supports Charity</p>
            </Card>
          </Grid>
          <Grid item xs={3} className="bannerInnerContainerDesktop">
            <Card>
              <img
                src={image3}
                alt="banner-image"
                className="bannerImageDesktop"
              />
              <p className="bannerImageText">Supports Charity</p>
            </Card>
          </Grid>
          <Grid item xs={3} className="bannerInnerContainerDesktop">
            <Card>
              <img
                src={image4}
                alt="banner-image"
                className="bannerImageDesktop"
              />
              <p className="bannerImageText">Supports Charity</p>
            </Card>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};

export default Banner;
