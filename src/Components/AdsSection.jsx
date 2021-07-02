import React, { useEffect } from "react";
import { getAds } from "../Functions/GlobalFunctions";

const AdsSection = () => {
  useEffect(() => {
    getAds("ads1", "41c84f599ee84a3e30131a1d393620de");
    setTimeout(() => {
      getAds("ads2", "c713cd1e92f8fc87dfb3dfd0ced286a0");
    }, 3000);
    setTimeout(() => {
      getAds("ads3", "78dc4bbd02d6a5584c75bc3dca0c9e13");
    }, 3500);
    setTimeout(() => {
      getAds("ads4", "18a4902d88549d3b213c9cc80ad57791");
    }, 4000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "2%",
        marginBottom: "2%",
      }}
    >
      <div id="ads1"></div>
      <div id="ads2"></div>
      <div id="ads3"></div>
      <div id="ads4"></div>
    </div>
  );
};

export default AdsSection;
