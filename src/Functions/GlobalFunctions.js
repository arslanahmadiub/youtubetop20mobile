import { getAdvanceSearchResult } from "../Services/GlobalServices";

export async function globalSearch(
  customDate,
  listOfSelectedRegions,
  tagsInput
) {
  try {
    let { data } = await getAdvanceSearchResult(
      customDate,
      listOfSelectedRegions,
      tagsInput
    );

    return data;
  } catch (error) {
    return error;
  }
}

export function getAds(containerId, bannerKey) {
  var div = document.getElementById(containerId);
  if (div !== null) {
    div.innerHTML = "";
    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.innerHTML = `atOptions = {key: "${bannerKey}",format: "iframe",height: 250,width: 300,params: {}};`;

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = `https://www.variouscreativeformats.com/${bannerKey}/invoke.js`;
    div.appendChild(s1);
    div.appendChild(s2);
  }
}

export function getAdsRectangleLarge(containerId, bannerKey) {
  var div = document.getElementById(containerId);
  if (div !== null) {
    div.innerHTML = "";

    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.innerHTML = `atOptions = {key: "${bannerKey}",format: "iframe",height: 60,width: 468,params: {}};`;

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = `https://www.variouscreativeformats.com/${bannerKey}/invoke.js`;
    div.appendChild(s1);
    div.appendChild(s2);
  }
}
export function getAdsRectangleSmall(containerId, bannerKey) {
  var div = document.getElementById(containerId);
  if (div !== null) {
    div.innerHTML = "";

    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.innerHTML = `atOptions = {key: "${bannerKey}",format: "iframe",height: 50,width: 320,params: {}};`;

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = `https://www.variouscreativeformats.com/${bannerKey}/invoke.js`;
    div.appendChild(s1);
    div.appendChild(s2);
  }
}
