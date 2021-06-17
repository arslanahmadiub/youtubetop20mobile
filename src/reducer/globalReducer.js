const initalState = {
  top20Videos: [],
  hot20Videos: [],
  regions: [],
  top20Loading: true,
  componentHeight: null,
  colorState: true,
  historyState: "",
  tabValue: 0,
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
    case "SET_LOADING":
      return {
        ...state,
        top20Loading: action.payload,
      };
    case "SET_COMPONENT_HEIGHT":
      return {
        ...state,
        componentHeight: action.payload,
      };
    case "SET_COMPONENT_MODE":
      return {
        ...state,
        colorState: action.payload,
      };
    case "SET_HISTORY":
      return {
        ...state,
        historyState: action.payload,
      };
    case "SET_TAB_VALUE":
      return {
        ...state,
        tabValue: action.payload,
      };

    case "RESET":
      return initalState;

    default:
      return state;
  }
};
