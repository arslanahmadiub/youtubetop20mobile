import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Hidden } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Typography } from "@material-ui/core";
import youtubeicon from "../images/youtubeicon.svg";
import { useSelector } from "react-redux";
const VideoViewInfo = (props) => {
  const colorSelector = useSelector((state) => state.globalData.colorState);

  const [open, setOpen] = useState(false);
  let {
    video_channelTitle,
    video_publishedAt,
    video_description,
    video_id,
    video_title,
    video_viewCount,
    view_count_per_24hour,
    video_thumbnails,
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

  var n = video_thumbnails.indexOf(",");

  let imageUrl = video_thumbnails.substring(9, n - 1);
  return (
    <Hidden only={["md", "lg", "xl"]}>
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
        >
          {/* <iframe
            width="100%"
            height="300"
            loading="lazy"
            src={`https://www.youtube.com/embed/${dynamicVideo}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          {/* <iframe
            width="100%"
            height="300"
            src={`https://www.youtube.com/embed/${dynamicVideo}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe> */}
          {/* <iframe
            width="700"
            height="330"
            src={`https://www.youtube.com/embed/${dynamicVideo}?rel=0`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          <iframe
            src={`https://www.youtube.com/embed/${dynamicVideo}?rel=0`}
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </Dialog>
      </React.Fragment>
      <Grid container style={{ paddingBottom: "20px", position: "relative" }}>
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
              {/* <iframe
                width="100%"
                height="200"
                loading="lazy"
                src={`https://www.youtube.com/embed/${video_id}`}
                title="YouTube video player"
                frameBorder="0"
                onLoad={offLoading}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ zIndex: loading ? "-50" : "1" }}
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
              <Skeleton
                variant="rect"
                width="100%"
                height="300px"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: "6",
                }}
              /> */}
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
              {/* <Grid
                item
                xs={12}
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                <Typography variant="subtitle1">Description</Typography>
              </Grid> */}
              {/* <Grid
                item
                xs={12}
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                <Tooltip
                  arrow
                  open={toolTipOpen2}
                  onClose={handleCloseTooltip2}
                  onOpen={handleOpenTooltip2}
                  title={video_description}
                >
                  <Typography noWrap>{video_description}</Typography>
                </Tooltip>
              </Grid> */}
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
                <h6>Channel </h6>
                <h6>{video_channelTitle}</h6>
              </Grid>
              <Grid item xs={3}>
                <h6>Days Old</h6>
                <h6>{video_publishedAt}</h6>
              </Grid>
              <Grid item xs={3}>
                <h6>Views in 24 Hours</h6>
                <h6>{view_count_per_24hour}</h6>
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
            <h3>#{props.top}</h3>
          </Fab>
        </Tooltip>
      </Grid>
    </Hidden>
  );
};

export default VideoViewInfo;
