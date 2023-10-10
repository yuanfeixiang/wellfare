import React from "react";
import { configureStore } from "@reduxjs/toolkit";

import serviceReducer from "./modules/service";
import etcReducer from "./modules/etc";

export default configureStore({
  reducer: {
    service: serviceReducer,
    etc: etcReducer,
  },
});
