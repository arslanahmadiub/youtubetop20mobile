import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Hidden } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import youtubeicon from "../images/youtubeicon.svg";
import { useSelector } from "react-redux";

const VideoViewInfo = (props) => {
  const colorSelector = useSelector((state) => state.globalData.colorState);

  const [open, setOpen] = useState(false);
  let {
    video_channelTitle,
    video_publishedAt,
    video_id,
    video_title,
    video_viewCount,
    view_count_per_24hour,
    video_thumbnails,
    id,
  } = props.data;
  const [dynamicVideo, setDynamicVideo] = useState("");
  let handelClick = (e) => {
    setOpen(true);
    setDynamicVideo(e);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [toolTipOpen, setToolTipOpen] = useState(false);

  const handleCloseTooltip = () => {
    setToolTipOpen(false);
  };

  const handleOpenTooltip = () => {
    setToolTipOpen(true);
  };

  const [toolTipOpen2, setToolTipOpen2] = useState(false);

  const handleCloseTooltip2 = () => {
    setToolTipOpen2(false);
  };

  const handleOpenTooltip2 = () => {
    setToolTipOpen2(true);
  };

  const [loading, setLoading] = useState(true);

  let offLoading = () => {
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
  }, [video_id]);
  let imageUrl;
  if (video_thumbnails) {
    var n = video_thumbnails.indexOf(",");

    imageUrl = video_thumbnails.substring(9, n - 1);
  }

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
            src={`https://www.youtube.com/embed/${dynamicVideo}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Dialog>
      </React.Fragment>
      <Grid
        container
        // style={{ paddingBottom: "20px", position: "relative", zIndex: "0" }}
        className="mobileInfoVideo"
      >
        <Grid
          item
          xs={12}
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <Card>
            <div
              className="frameContainer"
              onClick={() => handelClick(video_id)}
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
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  background: colorSelector ? "#616161" : "white",
                  color: colorSelector ? "white" : "black",
                }}
              >
                <Tooltip
                  arrow
                  open={toolTipOpen}
                  onClose={handleCloseTooltip}
                  onOpen={handleOpenTooltip}
                  title={video_title}
                >
                  <Typography noWrap>{video_title}</Typography>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
                paddingBottom: "10px",
                background: colorSelector ? "#616161" : "white",
                color: colorSelector ? "white" : "black",
              }}
            >
              <Grid item xs={3}>
                <h6>Views in 24 Hours</h6>
                <h6>{view_count_per_24hour}</h6>
              </Grid>
              <Grid item xs={3}>
                <h6>Channel </h6>
                <h6>{video_channelTitle}</h6>
              </Grid>
              <Grid item xs={3}>
                <h6>Days Old</h6>
                <h6>{video_publishedAt}</h6>
              </Grid>

              <Grid item xs={3}>
                <h6>Views </h6>
                <h6>{video_viewCount}</h6>
              </Grid>
            </Grid>
          </Card>
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
            <h3>#{id}</h3>
          </Fab>
        </Tooltip>
      </Grid>
    </Hidden>
  );
};

export default VideoViewInfo;
