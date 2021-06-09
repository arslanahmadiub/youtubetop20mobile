import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import VideoViewInfoDesktop from "./CustomComponents/VideoViewInfoDesktop";

import VideoVIewSimpleDesktop from "./CustomComponents/VideoVIewSimpleDesktop";
import { Hidden } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { top20DataAction, hot20DataAction } from "../action/GlobalAction";

const VideoComponentDesktop = () => {
  const dispatch = useDispatch();
  const colorSelector = useSelector((state) => state.globalData.colorState);

  const hot20Data = useSelector((state) => state.globalData.hot20Videos);
  const top20Data = useSelector((state) => state.globalData.top20Videos);

  top20Data &&
    top20Data.forEach(function (element, index) {
      element.hotData = hot20Data[index];
    });

  return (
    <Hidden only={["xs", "sm"]}>
      {top20Data !== undefined && top20Data.length > 0 ? (
        top20Data.map((e, i) => {
          return (
            <Grid
              container
              style={{ paddingLeft: "6%", paddingRight: "6%" }}
              spacing={5}
              key={i}
            >
              <Grid item xs={7}>
                <VideoViewInfoDesktop key={i} top={e.id} data={e} />
              </Grid>

              {e.hotData !== undefined && (
                <Grid
                  item
                  xs={5}
                  style={{
                    paddingLeft: "1%",
                    paddingRight: "1%",
                    borderLeft: colorSelector
                      ? "2px solid #ffffff"
                      : "2px solid #3F51B5",
                    direction: "rtl",
                  }}
                  id="hotvideosection"
                >
                  <VideoVIewSimpleDesktop
                    key={i}
                    top={e.hotData !== undefined ? e.hotData.id : ""}
                    videoId={e.hotData !== undefined ? e.hotData.video_id : ""}
                    thumbnail={
                      e.hotData !== undefined ? e.hotData.video_thumbnails : ""
                    }
                  />
                </Grid>
              )}
            </Grid>
          );
        })
      ) : (
        <Grid
          container
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
        >
          <h1 style={{ color: colorSelector ? "white" : "#3F51B5" }}>
            ☹️ Sorry! No videos Found.
          </h1>
        </Grid>
      )}
    </Hidden>
  );
};

export default VideoComponentDesktop;
