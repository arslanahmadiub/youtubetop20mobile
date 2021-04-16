import React from "react";
import { Grid } from "@material-ui/core";

import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Hidden } from "@material-ui/core";

const VideoViewSimple = (props) => {
  return (
    <Hidden only={["md", "lg", "xl"]}>
      <Grid container style={{ paddingBottom: "15px", position: "relative" }}>
        <Grid
          item
          xs={12}
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/_g7Oz51XmrM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="iframeStyle"
          ></iframe>
        </Grid>
        <Tooltip
          title="Add"
          aria-label="add"
          style={{
            position: "absolute",
            top: "5px",
            right: "15px",
            width: "40px",
            height: "40px",
          }}
        >
          <Fab color="primary">
            <h3>#{props.top}</h3>
          </Fab>
        </Tooltip>
      </Grid>
    </Hidden>
  );
};

export default VideoViewSimple;
