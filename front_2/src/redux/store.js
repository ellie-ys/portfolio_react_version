import { createStore } from "redux";
import { rootReducer } from "./index";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default createStore(enhancedReducer);
