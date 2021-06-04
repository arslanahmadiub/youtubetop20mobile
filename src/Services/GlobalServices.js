import axios from "axios";

import { apiEndPoint } from "../config.json";

let uniqueRegionsUrl = apiEndPoint + "getUniqueRegions/";
let globalTop20sUrl = apiEndPoint + "getGloblalTop20list/";
let globalHot20sUrl = apiEndPoint + "getGloblalHot20list/";
let regionalGlobalHot20sUrl = apiEndPoint + "getRegionalHot20list/";
let regionalGlobalTop20sUrl = apiEndPoint + "getRegionalTop20list/";
let advanceSearchUrl = apiEndPoint + "getAdvancedSearchResult|";

export async function getUniqueRegions() {
  return await axios({
    method: "get",
    url: uniqueRegionsUrl,
  });
}

export async function getGlobalTop20List() {
  return await axios({
    method: "get",
    url: globalTop20sUrl,
  });
}

export async function getGlobalHot20List() {
  return await axios({
    method: "get",
    url: globalHot20sUrl,
  });
}

export async function getRegionalGlobalHot20List(region) {
  return await axios({
    method: "get",
    url: regionalGlobalHot20sUrl + region,
  });
}

export async function getRegionalGlobalTop20List(region) {
  return await axios({
    method: "get",
    url: regionalGlobalTop20sUrl + region,
  });
}

export async function getAdvanceSearchResult(customDate, countries, tags) {
  return await axios({
    method: "get",
    url: advanceSearchUrl + customDate + "|" + countries + "|" + tags,
  });
}
