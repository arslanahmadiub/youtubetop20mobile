import React, { useEffect } from "react";
import Banner from "./Banner";
import VideoViewInfo from "./CustomComponents/VideoViewInfo";
import VideoViewSimple from "../Components/CustomComponents/VideoViewSimple";
import SearchingSection from "./SearchingSection";
import { Hidden } from "@material-ui/core";
import SearchSectionDesktop from "./SearchSectionDesktop";
import VideoComponentDesktop from "./VideoComponentDesktop";
import { useHistory } from "react-router-dom";
import { setHistory } from "../action/GlobalAction";

import { useSelector, useDispatch } from "react-redux";

const Main = () => {
  const colorSelector = useSelector((state) => state.globalData.colorState);

  const hot20Data = useSelector((state) => state.globalData.hot20Videos);
  const top20Data = useSelector((state) => state.globalData.top20Videos);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHistory(history.location.pathname));
  }, []);
  return (
    <div style={{ overflowX: "hidden" }}>
      <Banner />
      <SearchSectionDesktop />
      <SearchingSection />

      <Hidden only={["xs", "sm"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2
            style={{
              paddingLeft: "7%",
              paddingTop: "2%",
              paddingBottom: "1%",
              color: colorSelector ? "white" : "#3f51b5",
            }}
          >
            Top 20
          </h2>
          <h2
            style={{
              paddingRight: "32%",
              paddingTop: "2%",
              paddingBottom: "1%",

              color: colorSelector ? "white" : "#3f51b5",
            }}
          >
            Hot 20
          </h2>
        </div>
      </Hidden>

      <VideoComponentDesktop />
      <Hidden only={["md", "lg", "xl"]}>
        <h2
          style={{
            paddingLeft: "7%",
            paddingTop: "1%",
            paddingBottom: "3%",

            color: colorSelector ? "white" : "#3f51b5",
          }}
        >
          Top 20
        </h2>
      </Hidden>
      {top20Data !== undefined &&
        top20Data.length > 0 &&
        top20Data.map((e, i) => <VideoViewInfo key={i} top={i + 1} data={e} />)}
      <Hidden only={["md", "lg", "xl"]}>
        <h2
          style={{
            paddingLeft: "7%",
            paddingTop: "3%",
            paddingBottom: "3%",
            color: colorSelector ? "white" : "#3f51b5",
          }}
        >
          Hot 20
        </h2>
      </Hidden>
      {hot20Data !== undefined &&
        hot20Data.length > 0 &&
        hot20Data.map((e, i) => (
          <VideoViewSimple
            key={i}
            top={i + 1}
            videoId={e.video_id}
            thumbnail={e.video_thumbnails}
          />
        ))}
      <br />
      <Banner />
    </div>
  );
};

export default Main;
