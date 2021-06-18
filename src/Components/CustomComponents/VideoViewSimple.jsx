import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Hidden } from "@material-ui/core";
import youtubeicon from "../images/youtubeicon.svg";
import { useSelector } from "react-redux";

const VideoViewSimple = ({ top, videoId, thumbnail }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const colorSelector = useSelector((state) => state.globalData.colorState);

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

  var n = thumbnail.indexOf(",");

  let imageUrl = thumbnail.substring(9, n - 1);

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
            src={`https://www.youtube.com/embed/${dynamicVideo}`}
            title="YouTube video player"
            frameBorder="0"
            height="300"
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
            <img
              src={imageUrl}
              width="100%"
              className="videoView"
              style={{ cursor: "pointer" }}
            />
            <img
              src={youtubeicon}
              style={{ position: "absolute", left: "40%", top: "40%" }}
            />
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
            background: colorSelector ? "#424242" : "#3F51B5",
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
