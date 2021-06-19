import axios from "axios";

import { apiEndPoint } from "../config.json";

let uniqueRegionsUrl = apiEndPoint + "getUniqueRegions/";
let uniqueTagsUrl = apiEndPoint + "getUniqueTags/";

let advanceSearchUrl = apiEndPoint + "getSearchResults||";

export async function getUniqueRegions() {
  return await axios({
    method: "get",
    url: uniqueRegionsUrl,
  });
}

export async function getUniqueTags() {
  return await axios({
    method: "get",
    url: uniqueTagsUrl,
  });
}

export async function getAdvanceSearchResult(customDate, countries, tags) {
  return await axios({
    method: "get",
    url: advanceSearchUrl + customDate + "||" + countries + "||" + tags + "/",
  });
}

export async function getUserLocation() {
  return await axios({
    method: "get",
    url: "https://ip.nf/me.json",
  });
}
