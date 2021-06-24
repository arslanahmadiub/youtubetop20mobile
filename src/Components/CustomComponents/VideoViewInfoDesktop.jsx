import React, { useState, useEffect } from "react";
import { Hidden } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import youtubeicon from "../images/youtubeicon.svg";
import { componentHeight } from "../../action/GlobalAction";
import { useDispatch, useSelector } from "react-redux";

const VideoViewInfoDesktop = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const colorSelector = useSelector((state) => state.globalData.colorState);

  const handleCloseTooltip = () => {
    setToolTipOpen(false);
  };

  const handleOpenTooltip = () => {
    setToolTipOpen(true);
  };

  let {
    video_channelTitle,
    video_publishedAt,
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

  var n = video_thumbnails.indexOf(",");

  let imageUrl = video_thumbnails.substring(9, n - 1);

  const [loadImage, setLoadImage] = useState(false);

  let handelLoadImage = () => {
    setLoadImage(true);
  };

  let box = document.getElementById("cardFull");
  let height;
  if (box !== null && loadImage) {
    height = box.offsetHeight;
  }

  useEffect(() => {
    if (loadImage) {
      dispatch(componentHeight(height));
    }
  }, [height]);

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
            height="500"
            src={`https://www.youtube.com/embed/${dynamicVideo}?rel=0`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Dialog>
      </React.Fragment>

      <Grid container id="cardFull">
        <Grid item xs={12}>
          <Grid
            container
            className={
              colorSelector ? "videoviewdesktopDark" : "videoviewdesktop"
            }
          >
            <Grid item xs={5}>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                #{props.top}
              </p>

              <p className="videoTagsSimple"></p>

              <p className="videoTagsSimple">Views in 24 Hours</p>
              <p className="videoTags">{view_count_per_24hour}</p>
              <p className="videoTagsSimple"></p>

              <Tooltip
                arrow
                open={toolTipOpen}
                onClose={handleCloseTooltip}
                onOpen={handleOpenTooltip}
                title={video_title}
              >
                <Typography noWrap>{video_title}</Typography>
              </Tooltip>

              <p className="videoTags">{video_channelTitle}</p>

              <p className="videoTagsSimple">Days Old</p>
              <p className="videoTags">{video_publishedAt}</p>

              <p className="videoTagsSimple">Total Views</p>
              <p className="videoTags">{video_viewCount}</p>
            </Grid>
            <Grid item xs={7}>
              <div
                className="frameContainer"
                onClick={() => handelClick(video_id)}
              >
                <img
                  src={imageUrl}
                  width="100%"
                  className="videoView"
                  onLoad={handelLoadImage}
                />
                <img
                  src={youtubeicon}
                  style={{
                    position: "absolute",
                    left: "45%",
                    top: "40%",
                    cursor: "pointer",
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default VideoViewInfoDesktop;
