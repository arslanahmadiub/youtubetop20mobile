import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import { globalReducer } from "./globalReducer";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["globalData"],
};

const rootReducer = combineReducers({
  globalData: globalReducer,
});

export default persistReducer(persistConfig, rootReducer);
