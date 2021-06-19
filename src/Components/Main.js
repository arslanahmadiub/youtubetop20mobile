import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import VideoViewInfo from "./CustomComponents/VideoViewInfo";
import VideoViewSimple from "../Components/CustomComponents/VideoViewSimple";
import SearchingSection from "./SearchingSection";
import { Hidden } from "@material-ui/core";
import SearchSectionDesktop from "./SearchSectionDesktop";
import VideoComponentDesktop from "./VideoComponentDesktop";
import { useHistory } from "react-router-dom";
import { setHistory } from "../action/GlobalAction";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { useSelector, useDispatch } from "react-redux";
import InfoIcon from "@material-ui/icons/Info";
import Zoom from "@material-ui/core/Zoom";
import NavigationIcon from "@material-ui/icons/Navigation";
import { withStyles } from "@material-ui/core/styles";
import { animateScroll } from "react-scroll";

const BlueOnGreenTooltip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "#3F51B5",
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    "&::before": {
      backgroundColor: "#3F51B5",
    },
  },
})(Tooltip);
const BlackOnGreenTooltip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "black",
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    "&::before": {
      backgroundColor: "black",
    },
  },
})(Tooltip);

const Main = () => {
  const colorSelector = useSelector((state) => state.globalData.colorState);
  const hot20Data = useSelector((state) => state.globalData.hot20Videos);
  const top20Data = useSelector((state) => state.globalData.top20Videos);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHistory(history.location.pathname));
  }, []);

  // scrolling section

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  window.addEventListener("scroll", toggleVisible);

  const [top20TipOpen, setTop20TipOpen] = useState(false);
  const [hot20TipOpen, setHot20TipOpen] = useState(false);

  let handelTop20TipOpen = () => {
    setTop20TipOpen(true);
  };

  useEffect(() => {
    if (top20TipOpen) {
      setTimeout(() => {
        setTop20TipOpen(false);
      }, 3000);
    }
  }, [top20TipOpen]);
  useEffect(() => {
    if (hot20TipOpen) {
      setTimeout(() => {
        setHot20TipOpen(false);
      }, 3000);
    }
  }, [hot20TipOpen]);

  return (
    <div style={{ overflowX: "hidden", marginBottom: "50px" }}>
      <Fab
        size="medium"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "20px",
          zIndex: "50",
          right: "20px",
          display: visible ? "inline" : "none",
          background: colorSelector ? "white" : "#3F51B5",
        }}
        onClick={scrollToTop}
      >
        <NavigationIcon style={{ color: colorSelector ? "black" : "white" }} />
      </Fab>

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
            {top20Data.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Top 20
                {colorSelector ? (
                  <BlackOnGreenTooltip
                    title="The top 20 represents the most watched YouTube videos sorted by views over 24 hours"
                    style={{ color: "red" }}
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <InfoIcon
                      style={{
                        marginLeft: "5px",
                        marginTop: "2%",
                        width: "30px",
                        height: "30px",
                        color: colorSelector ? "white" : "#3F51B5",
                      }}
                    />
                  </BlackOnGreenTooltip>
                ) : (
                  <BlueOnGreenTooltip
                    title="The top 20 represents the most watched YouTube videos sorted by views over 24 hours"
                    style={{ color: "red" }}
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <InfoIcon
                      style={{
                        marginLeft: "5px",
                        marginTop: "2%",
                        width: "30px",
                        height: "30px",
                        color: colorSelector ? "white" : "#3F51B5",
                      }}
                    />
                  </BlueOnGreenTooltip>
                )}
              </div>
            ) : (
              ""
            )}
          </h2>
          <h2
            style={{
              paddingRight: "33%",
              paddingTop: "2%",
              paddingBottom: "1%",

              color: colorSelector ? "white" : "#3f51b5",
            }}
          >
            {hot20Data.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Hot 20
                {colorSelector ? (
                  <BlackOnGreenTooltip
                    title="The Hot 20 represents YouTube videos sorted for the highest (total views / time since published)"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <InfoIcon
                      style={{
                        marginLeft: "5px",
                        marginTop: "2%",
                        width: "30px",
                        height: "30px",
                        color: colorSelector ? "white" : "#3F51B5",
                      }}
                    />
                  </BlackOnGreenTooltip>
                ) : (
                  <BlueOnGreenTooltip
                    title="The Hot 20 represents YouTube videos sorted for the highest (total views / time since published)"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <InfoIcon
                      style={{
                        marginLeft: "5px",
                        marginTop: "2%",
                        width: "30px",
                        height: "30px",
                        color: colorSelector ? "white" : "#3F51B5",
                      }}
                    />
                  </BlueOnGreenTooltip>
                )}
              </div>
            ) : (
              ""
            )}
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
          {top20Data.length > 0 ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",

                alignItems: "center",
              }}
            >
              Top 20
              {colorSelector ? (
                <BlackOnGreenTooltip
                  title="The top 20 represents the most watched YouTube videos sorted by views over 24 hours"
                  arrow
                  TransitionComponent={Zoom}
                  open={top20TipOpen}
                >
                  <InfoIcon
                    style={{
                      marginLeft: "5px",

                      width: "25px",
                      height: "25px",
                      color: colorSelector ? "white" : "#3F51B5",
                    }}
                    onClick={handelTop20TipOpen}
                  />
                </BlackOnGreenTooltip>
              ) : (
                <BlueOnGreenTooltip
                  title="The top 20 represents the most watched YouTube videos sorted by views over 24 hours"
                  arrow
                  TransitionComponent={Zoom}
                  open={top20TipOpen}
                >
                  <InfoIcon
                    style={{
                      marginLeft: "5px",

                      width: "25px",
                      height: "25px",
                      color: colorSelector ? "white" : "#3F51B5",
                    }}
                    onClick={handelTop20TipOpen}
                  />
                </BlueOnGreenTooltip>
              )}
            </div>
          ) : (
            ""
          )}
        </h2>
      </Hidden>

      <Hidden only={["md", "lg", "xl"]}>
        {top20Data !== undefined && top20Data.length > 0 ? (
          top20Data.map((e, i) => (
            <VideoViewInfo key={i} top={i + 1} data={e} />
          ))
        ) : (
          <h1
            style={{
              color: colorSelector ? "white" : "#3F51B5",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            😢 Sorry! No videos Found.
          </h1>
        )}
      </Hidden>

      <Hidden only={["md", "lg", "xl"]}>
        <h2
          style={{
            paddingLeft: "7%",
            paddingTop: "3%",
            paddingBottom: "3%",
            color: colorSelector ? "white" : "#3f51b5",
          }}
        >
          {hot20Data.length > 0 ? (
            <div
              style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
              }}
            >
              Hot 20
              {colorSelector ? (
                <BlackOnGreenTooltip
                  title="The Hot 20 represents YouTube videos sorted for the highest (total views / time since published)"
                  arrow
                  TransitionComponent={Zoom}
                  open={hot20TipOpen}
                >
                  <InfoIcon
                    style={{
                      marginLeft: "5px",

                      width: "25px",
                      height: "25px",
                      color: colorSelector ? "white" : "#3F51B5",
                    }}
                    onClick={() => setHot20TipOpen(true)}
                  />
                </BlackOnGreenTooltip>
              ) : (
                <BlueOnGreenTooltip
                  title="The Hot 20 represents YouTube videos sorted for the highest (total views / time since published)"
                  arrow
                  TransitionComponent={Zoom}
                  open={hot20TipOpen}
                >
                  <InfoIcon
                    style={{
                      marginLeft: "5px",
                      width: "25px",
                      height: "25px",
                      color: colorSelector ? "white" : "#3F51B5",
                    }}
                    onClick={() => setHot20TipOpen(true)}
                  />
                </BlueOnGreenTooltip>
              )}
            </div>
          ) : (
            ""
          )}
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
