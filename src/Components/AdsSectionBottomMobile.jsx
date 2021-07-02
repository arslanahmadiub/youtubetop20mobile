import React, { useEffect } from "react";
import { getAds } from "../Functions/GlobalFunctions";

const AdsSectionBottomMobile = () => {
  useEffect(() => {
    setTimeout(() => {
      getAds("bottomMobileAds1", "78dc4bbd02d6a5584c75bc3dca0c9e13");
    }, 2000);
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
      <div id="bottomMobileAds1" style={{ marginBottom: "20px" }}></div>
    </div>
  );
};

export default AdsSectionBottomMobile;
