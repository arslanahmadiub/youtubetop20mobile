import React, { useState } from "react";
import { Hidden } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

const VideoViewInfoDesktop = (props) => {
  const [open, setOpen] = useState(false);

  let { channel, startDate, videoId, videoName, views } = props.data;
  const [dynamicVideo, setDynamicVideo] = useState("");
  let handelClick = (e) => {
    setOpen(true);
    setDynamicVideo(e);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Hidden only={["xs", "sm"]}>
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
        >
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${dynamicVideo}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Dialog>
      </React.Fragment>

      <Grid container style={{ marginBottom: "30px" }}>
        <Grid item xs={12}>
          <Grid container className="videoviewdesktop">
            <Grid item xs={5}>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                #{props.top}
              </p>

              <p className="videoTags">{channel}</p>
              <p className="videoTagsSimple">Video Name</p>
              <p className="videoTags">{videoName}</p>
              <p className="videoTagsSimple">Start Date</p>
              <p className="videoTags">{startDate}</p>
              <p className="videoTagsSimple">Days Old</p>
              <p className="videoTags">10 Days Old</p>
              <p className="videoTagsSimple">Views over 24 hours</p>
              <p className="videoTags">{views}</p>
            </Grid>
            <Grid item xs={7}>
              <div
                className="frameContainer"
                onClick={() => handelClick(videoId)}
              >
                <iframe
                  width="100%"
                  height="300"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="videoView"
                ></iframe>
                <div
                  style={{
                    background: "transperent",
                    zIndex: "5",
                    position: "absolute",
                    top: "0",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                ></div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default VideoViewInfoDesktop;
