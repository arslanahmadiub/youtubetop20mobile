const initalState = {
  top20Videos: [],
  hot20Videos: [],
  regions: [],
  top20Loading: true,
  componentHeight: null,
  colorState: true,
  historyState: "",
  tabValue: 0,
  selectorText: "Global",
  oldSelectorText: "Global",

  callUserLocation: true,
  globalTrending: false,
  top20NewVideos: [],
};

export const globalReducer = (state = initalState, action) => {
  switch (action.type) {
    case "SET_TOP_20_VIDEOS":
      return {
        ...state,
        top20Videos: action.payload,
      };
    case "SET_TOP_20_NEW":
      return {
        ...state,
        top20NewVideos: action.payload,
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
    case "SET_SELECTOR_TEXT":
      return {
        ...state,
        selectorText: action.payload,
      };
    case "SET_OLD_SELECTOR_TEXT":
      return {
        ...state,
        oldSelectorText: action.payload,
      };
    case "SET_CALL_USER_LOCATION":
      return {
        ...state,
        callUserLocation: action.payload,
      };
    case "GET_GLOBAL_TRENDING":
      return {
        ...state,
        globalTrending: action.payload,
      };

    case "RESET":
      return initalState;

    default:
      return state;
  }
};
