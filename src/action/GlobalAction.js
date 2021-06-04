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

export const resetData = () => {
  return {
    type: "RESET",
  };
};
