import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Hidden } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Skeleton from "@material-ui/lab/Skeleton";
import youtubeicon from "../images/youtubeicon.svg";
import { useSelector } from "react-redux";

const VideoVIewSimpleDesktop = ({ top, videoId, thumbnail }) => {
  const [open, setOpen] = useState(false);
  const [dynamicVideo, setDynamicVideo] = useState("");
  const [loading, setLoading] = useState(true);
  const colorSelector = useSelector((state) => state.globalData.colorState);

  const cHeight = useSelector((state) => state.globalData.componentHeight);

  let offLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [videoId]);

  let handelClick = (e) => {
    setOpen(true);
    setDynamicVideo(e);
  };
  const handleClose = () => {
    setOpen(false);
  };

  var n = thumbnail.indexOf(",");

  let imageUrl = thumbnail.substring(9, n - 1);
  return (
    <Hidden only={["xs", "sm"]}>
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
        >
          {/* <iframe
            width="100%"
            height="500px"
            loading="lazy"
            src={`https://www.youtube.com/embed/${dynamicVideo}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${dynamicVideo}?rel=0`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Dialog>
      </React.Fragment>
      <div style={{ position: "relative" }}>
        {/* <div
          style={{
            width: "100%",
            height: "100%",
            background: "#F0EFEF",
            position: "absolute",
            zIndex: loading ? "3" : "-55",
          }}
        ></div> */}
        {/* <Skeleton
          variant="rect"
          width="100%"
          height="280px"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: "4",
          }}
        /> */}
        {/* <iframe
          width="100%"
          height="280"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={offLoading}
          className="videoView"
          style={{ zIndex: loading ? "-55" : "1" }}
        ></iframe> */}
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
          onClick={() => handelClick(videoId)}
        ></div>

        {cHeight !== null && (
          <img
            src={imageUrl}
            width="100%"
            height={cHeight + "px"}
            className="videoView"
            style={{ cursor: "pointer" }}
          />
        )}

        <img
          src={youtubeicon}
          style={{ position: "absolute", left: "45%", top: "40%" }}
        />
      </div>
    </Hidden>
  );
};

export default VideoVIewSimpleDesktop;
