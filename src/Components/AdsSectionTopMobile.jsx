import React, { useEffect } from "react";
import { getAds } from "../Functions/GlobalFunctions";

const AdsSectionTopMobile = () => {
  useEffect(() => {
    getAds("topMobileAds1", "41c84f599ee84a3e30131a1d393620de");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <div id="topMobileAds1" style={{ marginBottom: "20px" }}></div>
    </div>
  );
};

export default AdsSectionTopMobile;
