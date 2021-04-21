import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Hidden } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

const VideoVIewSimpleDesktop = (props) => {
  const [open, setOpen] = useState(false);
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
      <div style={{ position: "relative", marginBottom: "30px" }}>
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${props.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="videoView"
        ></iframe>
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
          onClick={() => handelClick(props.videoId)}
        ></div>
      </div>
    </Hidden>
  );
};

export default VideoVIewSimpleDesktop;
