import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import serviceSlice from "./modules/service";
import favoriteSlice from "./modules/favorite";

const reducers = combineReducers({
  service: serviceSlice,
  favorite: favoriteSlice,
});

// config 작성
const persistConfig = {
  key: "root",
  storage, // 로컬 스토리지에 저장
  whitelist: ["service", "favorite"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
