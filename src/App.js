import React from "react";
import "./App.css";
import Banner from "./Components/Banner";
import FilterSection from "./Components/CustomComponents/FilterSection";
import VideoViewInfo from "./Components/CustomComponents/VideoViewInfo";
import VideoViewSimple from "./Components/CustomComponents/VideoViewSimple";
import Footer from "./Components/Footer";
import SearchingSection from "./Components/SearchingSection";
import Topbar from "./Components/Topbar";
import { Hidden } from "@material-ui/core";
import SearchSectionDesktop from "./Components/SearchSectionDesktop";
import VideoComponentDesktop from "./Components/VideoComponentDesktop";
import { TopVideos } from "./VideoConfig.json";

const App = () => {
  return (
    <>
      <Topbar />
      <Banner />
      <SearchSectionDesktop />
      <SearchingSection />
      <FilterSection />
      <Hidden only={["xs", "sm"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2
            style={{
              paddingLeft: "7%",
              paddingTop: "3%",
              color: "#3f51b5",
            }}
          >
            Top 20
          </h2>
          <h2
            style={{
              paddingRight: "23%",
              paddingTop: "3%",
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
      {TopVideos.map((e, i) => (
        <VideoViewInfo key={i} top={i + 1} data={e} />
      ))}
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
      {TopVideos.slice(0)
        .reverse()
        .map((e, i) => (
          <VideoViewSimple key={i} top={i + 1} videoId={e.videoId} />
        ))}
      <Banner />
      <Footer />
    </>
  );
};

export default App;
