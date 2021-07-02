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
import AdsSection from "./AdsSection";
import AdsSectionBottom from "./AdsSectionBottom";
import AdsSectionTopMobile from "./AdsSectionTopMobile";
import AdsSectionBottomMobile from "./AdsSectionBottomMobile";
import { getAds } from "../Functions/GlobalFunctions";

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

  let addsObject1 = {
    id: 400,
    key: 1,
    containerId: "mobileTop1",
  };
  let addsObject2 = {
    id: 400,
    key: 2,
    containerId: "mobileTop2",
  };
  let addsObject3 = {
    id: 400,
    key: 3,
    containerId: "mobileTop3",
  };
  let addsObject4 = {
    id: 400,
    key: 4,
    containerId: "mobileTop4",
  };
  let addsObject5 = {
    id: 400,
    key: 5,
    containerId: "mobileTop5",
  };

  let addsObject6 = {
    id: 400,
    key: 1,
    containerId: "mobileHot6",
  };
  let addsObject7 = {
    id: 400,
    key: 2,
    containerId: "mobileHot7",
  };
  let addsObject8 = {
    id: 400,
    key: 3,
    containerId: "mobileHot8",
  };
  let addsObject9 = {
    id: 400,
    key: 4,
    containerId: "mobileHot9",
  };
  let addsObject10 = {
    id: 400,
    key: 5,
    containerId: "mobileHot10",
  };

  useEffect(() => {
    top20Data.splice(4, 0, addsObject1);
    top20Data.splice(9, 0, addsObject2);
    top20Data.splice(14, 0, addsObject3);
    top20Data.splice(19, 0, addsObject4);
    top20Data.splice(24, 0, addsObject5);
  }, [top20Data]);

  useEffect(() => {
    hot20Data.splice(4, 0, addsObject6);
    hot20Data.splice(9, 0, addsObject7);
    hot20Data.splice(14, 0, addsObject8);
    hot20Data.splice(19, 0, addsObject9);
    hot20Data.splice(24, 0, addsObject10);
  }, [hot20Data]);

  useEffect(() => {
    setTimeout(() => {
      getAds("mobileTop1", "f115cfab7bd15124908c0b38696c5c2e");
    }, 6000);
    setTimeout(() => {
      getAds("mobileTop2", "c3d246d1dc5a3c5cbaa9498115c4c2e6");
    }, 7000);
    setTimeout(() => {
      getAds("mobileTop3", "2da0c2bb2d961b93729a3547bad82631");
    }, 8000);
    setTimeout(() => {
      getAds("mobileTop4", "db2db4031782f0e417dfb5faa1759fe2");
    }, 9000);
    setTimeout(() => {
      getAds("mobileTop5", "1e089e11d3a4359ae4c17693f0e4b9eb");
    }, 10000);
  }, [top20Data]);

  useEffect(() => {
    setTimeout(() => {
      getAds("mobileHot6", "862ebb093ee9fea71b41b6498a30003e");
    }, 11000);
    setTimeout(() => {
      getAds("mobileHot7", "8fcebd81baaa80b06394b1b75fd786cf");
    }, 12000);
    setTimeout(() => {
      getAds("mobileHot8", "02404e7588aa1f2476fab819e92f2afa");
    }, 13000);
    setTimeout(() => {
      getAds("mobileHot9", "c713cd1e92f8fc87dfb3dfd0ced286a0");
    }, 14000);
    setTimeout(() => {
      getAds("mobileHot10", "18a4902d88549d3b213c9cc80ad57791");
    }, 15000);
  }, [hot20Data]);

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
      <Hidden only={["xs", "sm"]}>
        <AdsSection />
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <AdsSectionTopMobile />
      </Hidden>
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
          top20Data.map((e, i) => {
            return e.id === 400 ? (
              <div
                id={e.containerId}
                style={{
                  display: "flex",

                  width: "100%",
                  justifyContent: "center",
                  marginBottom: "15px",
                  marginTop: "10px",
                }}
              ></div>
            ) : (
              <VideoViewInfo key={i} top={i + 1} data={e} />
            );
          })
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
              See Global Viral Videos
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
      <Hidden only={["md", "lg", "xl"]}>
        {hot20Data !== undefined &&
          hot20Data.length > 0 &&
          hot20Data.map((e, i) => {
            return e.id === 400 ? (
              <div
                id={e.containerId}
                style={{
                  display: "flex",

                  width: "100%",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              ></div>
            ) : (
              <VideoViewSimple
                key={i}
                top={e.id}
                videoId={e.video_id}
                thumbnail={e.video_thumbnails}
              />
            );
          })}
      </Hidden>
      <br />

      {/* <div>
        <iframe
          width="300"
          height="250"
          src="http' + (location.protocol === 'https:' ? 's' : '') + '://exposuremixed.com/db2db4031782f0e417dfb5faa1759fe2"
        ></iframe>
      </div> */}

      {/* <Banner /> */}
      <Hidden only={["xs", "sm"]}>
        <AdsSectionBottom />
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <AdsSectionBottomMobile />
      </Hidden>
    </div>
  );
};

export default Main;
