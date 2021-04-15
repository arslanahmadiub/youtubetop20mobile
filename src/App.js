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

const App = () => {
  return (
    <>
      <Hidden only={["sm", "xs"]}>
        <h1
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "20%",
          }}
        >
          Only Mobile Preview Available
        </h1>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Topbar />
        <Banner />
        <SearchingSection />
        <FilterSection />

        <h2
          style={{
            paddingLeft: "15px",
            paddingBottom: "15px",
            color: "#3f51b5",
          }}
        >
          Top 20
        </h2>

        {[...Array(10)].map((e, i) => (
          <VideoViewInfo key={i} top={i + 1} />
        ))}
        <h2 style={{ padding: "30px", color: "#3f51b5" }}>Hot 20</h2>
        {[...Array(10)].map((e, i) => (
          <VideoViewSimple key={i} top={i + 1} />
        ))}
        <Banner />
        <Footer />
      </Hidden>
    </>
  );
};

export default App;
