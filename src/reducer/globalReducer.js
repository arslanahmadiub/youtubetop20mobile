const initalState = {
  top20Videos: [],
  hot20Videos: [],
  regions: [],
};

export const globalReducer = (state = initalState, action) => {
  switch (action.type) {
    case "SET_TOP_20_VIDEOS":
      return {
        ...state,
        top20Videos: action.payload,
      };

    case "SET_HOT_20_VIDEOS":
      return {
        ...state,
        hot20Videos: action.payload,
      };
    case "REGIONS_DATA":
      return {
        ...state,
        regions: action.payload,
      };

    case "RESET":
      return initalState;

    default:
      return state;
  }
};
