import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Hidden } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const VideoViewSimple = ({ top, videoId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dynamicVideo, setDynamicVideo] = useState("");

  let handelClick = (e) => {
    setOpen(true);
    setDynamicVideo(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let offLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [videoId]);

  return (
    <Hidden only={["md", "lg", "xl"]}>
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
        >
          <iframe
            width="100%"
            height="300"
            loading="lazy"
            src={`https://www.youtube.com/embed/${dynamicVideo}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Dialog>
      </React.Fragment>
      <Grid container style={{ paddingBottom: "15px", position: "relative" }}>
        <Grid
          item
          xs={12}
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <div
            className="frameContainer"
            onClick={() => handelClick(videoId)}
            style={{ position: "relative" }}
          >
            <div
              className="iframeStyle"
              style={{
                width: "100%",
                height: "200px",
                background: "#F0EFEF",
                zIndex: loading ? "1" : "-50",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            ></div>
            <iframe
              width="100%"
              height="200"
              loading="lazy"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              onLoad={offLoading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="iframeStyle"
              style={{ zIndex: loading ? "-50" : "50" }}
            ></iframe>
            <Skeleton
              variant="rect"
              width="100%"
              height="200px"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: "4",
              }}
            />
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
            <h3>#{top}</h3>
          </Fab>
        </Tooltip>
      </Grid>
    </Hidden>
  );
};

export default VideoViewSimple;
