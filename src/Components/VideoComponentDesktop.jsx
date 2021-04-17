import React from "react";
import { Grid } from "@material-ui/core";
import VideoViewInfoDesktop from "./CustomComponents/VideoViewInfoDesktop";

import VideoVIewSimpleDesktop from "./CustomComponents/VideoVIewSimpleDesktop";
import { Hidden } from "@material-ui/core";

const VideoComponentDesktop = (props) => {
  return (
    <Hidden only={["xs", "sm"]}>
      <Grid container style={{ paddingLeft: "6%", paddingTop: "2%" }}>
        <Grid item xs={8}>
          {[...Array(10)].map((e, i) => (
            <VideoViewInfoDesktop key={i} top={i + 1} />
          ))}
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            paddingLeft: "1%",
            paddingRight: "1%",
            height: "100vh",
            overflow: "auto",
            direction: "rtl",
          }}
        >
          {[...Array(10)].map((e, i) => (
            <VideoVIewSimpleDesktop key={i} top={i + 1} />
          ))}
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default VideoComponentDesktop;
