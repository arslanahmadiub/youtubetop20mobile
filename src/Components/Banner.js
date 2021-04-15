import React from "react";
import { Grid } from "@material-ui/core";
import image1 from "./images/1.jpg";
import image2 from "./images/2.png";
import image3 from "./images/3.png";
import image4 from "./images/4.jpg";

const Banner = () => {
  return (
    <Grid container className="bannerMainContainer">
      <Grid item xs={6} className="bannerInnerContainer">
        <img src={image1} alt="banner-image" className="bannerImage" />
      </Grid>
      <Grid item xs={6} className="bannerInnerContainer">
        <img src={image2} alt="banner-image" className="bannerImage" />
      </Grid>
      <Grid item xs={6} className="bannerInnerContainer">
        <img src={image3} alt="banner-image" className="bannerImage" />
      </Grid>
      <Grid item xs={6} className="bannerInnerContainer">
        <img src={image4} alt="banner-image" className="bannerImage" />
      </Grid>
    </Grid>
  );
};

export default Banner;
