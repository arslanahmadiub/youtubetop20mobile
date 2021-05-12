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

export const resetData = () => {
  return {
    type: "RESET",
  };
};
