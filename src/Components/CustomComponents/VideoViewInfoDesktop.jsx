import React from "react";
import { Hidden } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const VideoViewInfoDesktop = (props) => {
  return (
    <Hidden only={["xs", "sm"]}>
      <Grid container style={{ marginBottom: "30px" }}>
        <Grid item xs={12}>
          <Grid container className="videoviewdesktop">
            <Grid item xs={5}>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                #{props.top}
              </p>

              <p className="videoTags">Khabardar with Aftab Iqbal</p>
              <p className="videoTagsSimple">Video Name</p>
              <p className="videoTags">
                Strange History of Charsadda | Khabardar With Aftab Iqbal |
                Express News | IC2H
              </p>
              <p className="videoTagsSimple">Start Date</p>
              <p className="videoTags">April 10, 2021</p>
              <p className="videoTagsSimple">Days Old</p>
              <p className="videoTags">10 Days Old</p>
              <p className="videoTagsSimple">Views over 24 hours</p>
              <p className="videoTags">23 Million Views</p>
            </Grid>
            <Grid item xs={7}>
              <iframe
                width="100%"
                height="300"
                src="https://www.youtube.com/embed/_g7Oz51XmrM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="videoView"
              ></iframe>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default VideoViewInfoDesktop;
