import React, { useEffect } from "react";
import Banner from "./Banner";

import FilterSection from "./CustomComponents/FilterSection";
import VideoViewInfo from "./CustomComponents/VideoViewInfo";
import VideoViewSimple from "../Components/CustomComponents/VideoViewSimple";

import SearchingSection from "./SearchingSection";

import { Hidden } from "@material-ui/core";
import SearchSectionDesktop from "./SearchSectionDesktop";
import VideoComponentDesktop from "./VideoComponentDesktop";

import { TopVideos } from "../VideoConfig.json";

import { useDispatch, useSelector } from "react-redux";
import { getGlobalTop20List } from "../Services/GlobalServices";
import { getGlobalHot20List } from "../Services/GlobalServices";
import { top20DataAction, hot20DataAction } from "../action/GlobalAction";

const Main = () => {
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
    <>
      <Banner />
      <SearchSectionDesktop />
      <SearchingSection />
      {/* <FilterSection /> */}
      <Hidden only={["xs", "sm"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2
            style={{
              paddingLeft: "7%",
              paddingTop: "3%",
              paddingBottom: "2%",
              color: "#3f51b5",
            }}
          >
            Top 20
          </h2>
          <h2
            style={{
              paddingRight: "32%",
              paddingTop: "3%",
              paddingBottom: "2%",

              color: "#3f51b5",
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
            paddingTop: "3%",
            paddingBottom: "3%",

            color: "#3f51b5",
          }}
        >
          Top 20
        </h2>
      </Hidden>
      {top20Data !== "undefined" &&
        top20Data.length > 0 &&
        top20Data.map((e, i) => <VideoViewInfo key={i} top={i + 1} data={e} />)}
      <Hidden only={["md", "lg", "xl"]}>
        <h2
          style={{
            paddingLeft: "7%",
            paddingTop: "3%",
            paddingBottom: "3%",
            color: "#3f51b5",
          }}
        >
          Hot 20
        </h2>
      </Hidden>
      {hot20Data.length > 0 &&
        hot20Data.map((e, i) => (
          <VideoViewSimple key={i} top={i + 1} videoId={e.video_id} />
        ))}
      <Banner />
    </>
  );
};

export default Main;
