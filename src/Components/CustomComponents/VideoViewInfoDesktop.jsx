import React, { useState, useEffect } from "react";
import { Hidden } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Skeleton from "@material-ui/lab/Skeleton";
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

  const [toolTipOpen2, setToolTipOpen2] = useState(false);

  const handleCloseTooltip2 = () => {
    setToolTipOpen2(false);
  };

  const handleOpenTooltip2 = () => {
    setToolTipOpen2(true);
  };

  let {
    video_channelTitle,
    video_publishedAt,
    // video_description,
    video_id,
    video_title,
    video_viewCount,
    view_count_per_24hour,
    video_thumbnails,
  } = props.data;
  const [dynamicVideo, setDynamicVideo] = useState("");
  const [loading, setLoading] = useState(true);

  let offLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [video_id]);

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
          {/* <iframe
            width="100%"
            height="500px"
            loading="lazy"
            // src={`https://www.youtube.com/embed/${dynamicVideo}?autoplay=1`}
            src={`https://www.youtube.com/embed/${dynamicVideo}?modestbranding=0&autohide=1&showinfo=1&controls=1&autoplay=1`}
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

              {/* <p className="videoTagsSimple">Description</p>

              <Tooltip
                arrow
                open={toolTipOpen2}
                onClose={handleCloseTooltip2}
                onOpen={handleOpenTooltip2}
                title={video_description}
              >
                <Typography noWrap>{video_description}</Typography>
              </Tooltip> */}

              <p className="videoTagsSimple">Days Old</p>
              <p className="videoTags">{video_publishedAt}</p>

              <p className="videoTagsSimple">Total Views</p>
              <p className="videoTags">{video_viewCount}</p>
              <p className="videoTagsSimple">Views in 24 Hours</p>
              <p className="videoTags">{view_count_per_24hour}</p>
            </Grid>
            <Grid item xs={7}>
              <div
                className="frameContainer"
                onClick={() => handelClick(video_id)}
              >
                {/* <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${video_id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  onLoad={offLoading}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="videoView"
                  style={{ zIndex: loading ? "-50" : "1" }}
                ></iframe> */}
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
                {/* <div
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
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default VideoViewInfoDesktop;
