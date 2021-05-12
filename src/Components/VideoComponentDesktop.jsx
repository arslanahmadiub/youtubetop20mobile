import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import VideoViewInfoDesktop from "./CustomComponents/VideoViewInfoDesktop";

import VideoVIewSimpleDesktop from "./CustomComponents/VideoVIewSimpleDesktop";
import { Hidden } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getGlobalTop20List } from "../Services/GlobalServices";
import { getGlobalHot20List } from "../Services/GlobalServices";
import { top20DataAction, hot20DataAction } from "../action/GlobalAction";

const VideoComponentDesktop = () => {
  const dispatch = useDispatch();

  const hot20Data = useSelector((state) => state.globalData.hot20Videos);
  const top20Data = useSelector((state) => state.globalData.top20Videos);

  let globalTop20Data = async () => {
    try {
      let { data } = await getGlobalTop20List();
      dispatch(top20DataAction(data.Data));
    } catch (error) {
      console.log(error);
    }
  };

  let globalHot20Data = async () => {
    try {
      let { data } = await getGlobalHot20List();
      dispatch(hot20DataAction(data.Data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    globalTop20Data();
    globalHot20Data();
  }, []);

  return (
    <Hidden only={["xs", "sm"]}>
      <Grid
        container
        style={{ paddingLeft: "6%", paddingTop: "2%" }}
        spacing={2}
      >
        <Grid item xs={8}>
          {top20Data.length > 0 &&
            top20Data.map((e, i) => (
              <VideoViewInfoDesktop key={i} top={i + 1} data={e} />
            ))}
        </Grid>

        <Grid
          item
          xs={4}
          style={{
            paddingLeft: "1%",
            paddingRight: "1%",
            height: "100vh",
            overflow: "auto",
            direction: "rtl",
          }}
          id="hotvideosection"
        >
          {hot20Data.map((e, i) => (
            <VideoVIewSimpleDesktop key={i} top={i + 1} videoId={e.video_id} />
          ))}
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default VideoComponentDesktop;
