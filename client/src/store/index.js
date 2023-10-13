import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import serviceSlice from "./modules/service";
import etcSlice from "./modules/etc";

const reducers = combineReducers({
  service: serviceSlice,
  etc: etcSlice,
});

// config 작성
const persistConfig = {
  key: "root",
  storage, // 로컬 스토리지에 저장
  whitelist: ["service"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
