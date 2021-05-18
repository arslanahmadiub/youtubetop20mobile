import React, { useState, useEffect } from "react";
import { Hidden } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Skeleton from "@material-ui/lab/Skeleton";
import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const VideoViewInfoDesktop = (props) => {
  const [open, setOpen] = useState(false);

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

  let {
    video_channelTitle,
    video_publishedAt,
    video_description,
    video_id,
    video_title,
    video_viewCount,
    view_count_per_24hour,
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
            loading="lazy"
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

              <p className="videoTagsSimple">Description</p>

              <Tooltip
                arrow
                open={toolTipOpen2}
                onClose={handleCloseTooltip2}
                onOpen={handleOpenTooltip2}
                title={video_description}
              >
                <Typography noWrap>{video_description}</Typography>
              </Tooltip>

              <p className="videoTagsSimple">Published Date</p>
              <p className="videoTags">{video_publishedAt}</p>

              <p className="videoTagsSimple">Total Views</p>
              <p className="videoTags">{video_viewCount}</p>
              <p className="videoTagsSimple">Views in 24 Hour</p>
              <p className="videoTags">{view_count_per_24hour}</p>
            </Grid>
            <Grid item xs={7}>
              <div
                className="frameContainer"
                onClick={() => handelClick(video_id)}
              >
                <iframe
                  width="100%"
                  height="300"
                  src={`https://www.youtube.com/embed/${video_id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  onLoad={offLoading}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="videoView"
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
