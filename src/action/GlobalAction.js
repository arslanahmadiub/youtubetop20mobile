export const top20DataAction = (data) => {
  return {
    type: "SET_TOP_20_VIDEOS",
    payload: data,
  };
};
export const hot20DataAction = (data) => {
  return {
    type: "SET_HOT_20_VIDEOS",
    payload: data,
  };
};

export const regionsDataAction = (data) => {
  return {
    type: "REGIONS_DATA",
    payload: data,
  };
};

export const componentHeight = (data) => {
  return {
    type: "SET_COMPONENT_HEIGHT",
    payload: data,
  };
};

export const componentMode = (data) => {
  return {
    type: "SET_COMPONENT_MODE",
    payload: data,
  };
};

export const setLoading = (data) => {
  return {
    type: "SET_LOADING",
    payload: data,
  };
};
export const setHistory = (data) => {
  return {
    type: "SET_HISTORY",
    payload: data,
  };
};
export const setTabValue = (data) => {
  return {
    type: "SET_TAB_VALUE",
    payload: data,
  };
};
export const setSelectorText = (data) => {
  return {
    type: "SET_SELECTOR_TEXT",
    payload: data,
  };
};
export const setOldSelectorText = (data) => {
  return {
    type: "SET_OLD_SELECTOR_TEXT",
    payload: data,
  };
};
export const setCallUserLocation = (data) => {
  return {
    type: "SET_CALL_USER_LOCATION",
    payload: data,
  };
};

export const top20NewDataAction = (data) => {
  return {
    type: "SET_TOP_20_NEW",
    payload: data,
  };
};

export const getGlobalTrending = (data) => {
  return {
    type: "GET_GLOBAL_TRENDING",
    payload: data,
  };
};

export const resetData = () => {
  return {
    type: "RESET",
  };
};
