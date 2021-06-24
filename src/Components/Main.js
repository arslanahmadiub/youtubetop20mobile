import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import VideoViewInfo from "./CustomComponents/VideoViewInfo";
import VideoViewSimple from "../Components/CustomComponents/VideoViewSimple";
import SearchingSection from "./SearchingSection";
import { Hidden } from "@material-ui/core";
import SearchSectionDesktop from "./SearchSectionDesktop";
import VideoComponentDesktop from "./VideoComponentDesktop";
import { useHistory } from "react-router-dom";
import { setHistory, getGlobalTrending } from "../action/GlobalAction";
import Fab from "@material-ui/core/Fab";
import { useSelector, useDispatch } from "react-redux";
import NavigationIcon from "@material-ui/icons/Navigation";
import { withStyles } from "@material-ui/core/styles";
import { animateScroll } from "react-scroll";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import colorIcon from "./images/color.svg";
import darkIcon from "./images/dark.svg";
import Button from "@material-ui/core/Button";

const BlueOnGreenTooltip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "gray",
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    "&::before": {
      backgroundColor: "gray",
    },
  },
})(Tooltip);
const BlackOnGreenTooltip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "#0f478c",
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    "&::before": {
      backgroundColor: "#0f478c",
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

  let handleClickAwayTop20 = () => {
    setTop20TipOpen(false);
  };
  let handleClickAwayHot20 = () => {
    setHot20TipOpen(false);
  };

  let handelGlobalTrending = () => {
    dispatch(getGlobalTrending(true));

    setTimeout(() => {
      dispatch(getGlobalTrending(false));
    }, 5000);
  };

  return (
    <div style={{ overflowX: "hidden", marginBottom: "50px" }} id="mainPage">
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

      {/* <Banner /> */}
      <SearchSectionDesktop />
      <br />
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
                    <img
                      src={colorIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "3%",
                        width: "25px",
                        height: "25px",
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
                    <img
                      src={darkIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "3%",
                        width: "25px",
                        height: "25px",
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
                    <img
                      src={colorIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "3%",
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </BlackOnGreenTooltip>
                ) : (
                  <BlueOnGreenTooltip
                    title="The Hot 20 represents YouTube videos sorted for the highest (total views / time since published)"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <img
                      src={darkIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "3%",
                        width: "25px",
                        height: "25px",
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
            paddingTop: "3%",
            paddingBottom: "3%",
            display: "flex",
            alignItems: "center",
            height: "100%",
            color: colorSelector ? "white" : "#3f51b5",
          }}
        >
          {top20Data.length > 0 ? (
            <div>
              Top 20
              {colorSelector ? (
                <ClickAwayListener onClickAway={handleClickAwayTop20}>
                  <BlackOnGreenTooltip
                    title="The top 20 represents the most watched YouTube videos sorted by views over 24 hours"
                    arrow
                    TransitionComponent={Zoom}
                    open={top20TipOpen}
                  >
                    <img
                      src={colorIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "1%",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={handelTop20TipOpen}
                    />
                  </BlackOnGreenTooltip>
                </ClickAwayListener>
              ) : (
                <ClickAwayListener onClickAway={handleClickAwayTop20}>
                  <BlueOnGreenTooltip
                    title="The top 20 represents the most watched YouTube videos sorted by views over 24 hours"
                    arrow
                    TransitionComponent={Zoom}
                    open={top20TipOpen}
                  >
                    <img
                      src={darkIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "1%",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={handelTop20TipOpen}
                    />
                  </BlueOnGreenTooltip>
                </ClickAwayListener>
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
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                color: colorSelector ? "white" : "#3F51B5",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              😢 Sorry! No Viral Videos Found.
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
              See Global Trending
            </Button>
          </div>
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
                <ClickAwayListener onClickAway={handleClickAwayHot20}>
                  <BlackOnGreenTooltip
                    title="The Hot 20 represents YouTube videos sorted for the highest (total views / time since published)"
                    arrow
                    TransitionComponent={Zoom}
                    open={hot20TipOpen}
                  >
                    <img
                      src={colorIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "1%",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => setHot20TipOpen(true)}
                    />
                  </BlackOnGreenTooltip>
                </ClickAwayListener>
              ) : (
                <ClickAwayListener onClickAway={handleClickAwayHot20}>
                  <BlueOnGreenTooltip
                    title="The Hot 20 represents YouTube videos sorted for the highest (total views / time since published)"
                    arrow
                    TransitionComponent={Zoom}
                    open={hot20TipOpen}
                  >
                    <img
                      src={darkIcon}
                      style={{
                        marginLeft: "10px",
                        marginTop: "1%",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => setHot20TipOpen(true)}
                    />
                  </BlueOnGreenTooltip>
                </ClickAwayListener>
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
      <div style={{ marginTop: "1%" }}></div>
      {/* <Banner /> */}
    </div>
  );
};

export default Main;
