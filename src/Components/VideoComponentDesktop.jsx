import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import VideoViewInfoDesktop from "./CustomComponents/VideoViewInfoDesktop";

import VideoVIewSimpleDesktop from "./CustomComponents/VideoVIewSimpleDesktop";
import { Hidden } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { getGlobalTrending } from "../action/GlobalAction";
import Button from "@material-ui/core/Button";

import {
  getAdsRectangleLarge,
  getAdsRectangleSmall,
} from "../Functions/GlobalFunctions";

const VideoComponentDesktop = () => {
  const dispatch = useDispatch();
  const colorSelector = useSelector((state) => state.globalData.colorState);

  const hot20Data = useSelector((state) => state.globalData.hot20Videos);
  const top20Data = useSelector((state) => state.globalData.top20NewVideos);
  let addsObject1 = {
    id: 400,
    key: 1,
  };
  let addsObject2 = {
    id: 400,
    key: 2,
  };
  let addsObject3 = {
    id: 400,
    key: 3,
  };
  let addsObject4 = {
    id: 400,
    key: 4,
  };
  let addsObject5 = {
    id: 400,
    key: 5,
  };

  useEffect(() => {
    top20Data.splice(4, 0, addsObject1);
    top20Data.splice(9, 0, addsObject2);
    top20Data.splice(14, 0, addsObject3);
    top20Data.splice(19, 0, addsObject4);
    top20Data.splice(24, 0, addsObject5);
  }, [top20Data]);

  useEffect(() => {
    setTimeout(() => {
      getAdsRectangleLarge("top1", "b08d8207138d397b8e7ceed480a81f97");
    }, 6000);

    setTimeout(() => {
      getAdsRectangleSmall("hot1", "75dd08b3daa15a4e32d571f5160f0e0e");
    }, 6500);

    setTimeout(() => {
      getAdsRectangleLarge("top2", "1142b0a47e29960ecb87e455e44c7f90");
    }, 7000);

    setTimeout(() => {
      getAdsRectangleSmall("hot2", "980f109665cb1c3c8466de86c655317f");
    }, 7500);

    setTimeout(() => {
      getAdsRectangleLarge("top3", "69d9522c989a22ac6192ad6245087db4");
    }, 8000);

    setTimeout(() => {
      getAdsRectangleSmall("hot3", "8ffff4e717b90a0c151f041d14452509");
    }, 8500);

    setTimeout(() => {
      getAdsRectangleLarge("top4", "a5dae6703cab4cb51381bf3adbfba041");
    }, 9000);

    setTimeout(() => {
      getAdsRectangleSmall("hot4", "bdce3ccf90863ea880a84a1290c61704");
    }, 9500);

    setTimeout(() => {
      getAdsRectangleLarge("top5", "7892d5947d432d6fda2d916b28ed869e");
    }, 10000);

    setTimeout(() => {
      getAdsRectangleSmall("hot5", "200927bc6bab5643130f5a30f001392e");
    }, 10500);
  }, [top20Data]);

  let handelGlobalTrending = () => {
    dispatch(getGlobalTrending(true));

    setTimeout(() => {
      dispatch(getGlobalTrending(false));
    }, 5000);
  };

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
              id="mainVideoContainer"
            >
              {e.id === 400 ? (
                <Grid item xs={7}>
                  <div
                    id={`top${e.key}`}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  ></div>
                </Grid>
              ) : (
                <Grid item xs={7}>
                  <VideoViewInfoDesktop key={i} top={e.id} data={e} />
                </Grid>
              )}

              {e.id === 400 ? (
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
                  <div
                    id={`hot${e.key}`}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  ></div>
                </Grid>
              ) : (
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
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ color: colorSelector ? "white" : "#3F51B5" }}>
            ☹️ Sorry! No Viral Videos Found.
          </h1>
          <br />
          <Button
            style={{
              height: "41px",

              fontWeight: "600",
              color: !colorSelector ? "#3F51B5" : "white",
              border: colorSelector ? "2px solid white" : "2px solid #3F51B5",
            }}
            onClick={handelGlobalTrending}
          >
            See Global Viral Videos
          </Button>
        </Grid>
      )}
    </Hidden>
  );
};

export default VideoComponentDesktop;
