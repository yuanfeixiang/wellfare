import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  page: 1,
  sunder: 0,
  searchWord: "",
  serviceArray: [],
  lifeArray: [],
  gaguArray: [],
  intrsArray: [],
  endNum: 0,
};

export const getService = createAsyncThunk(
  "service/getService",
  async (data) => {
    const { page, sunder, searchWord, lifeArray, gaguArray, intrsArray } = data;

    try {
      const res = await getServiceListFromServer(
        (page - 1) * 8,
        sunder,
        searchWord,
        lifeArray,
        gaguArray,
        intrsArray
      );

      return {
        page: page,
        sunder: sunder,
        searchWord: searchWord,
        serviceArray: res.serviceArray,
        lifeArray: lifeArray,
        gaguArray: gaguArray,
        intrsArray: intrsArray,
        total: res.total,
      };
    } catch (err) {
      console.error(err);
    }
  }
);

async function getServiceListFromServer(
  startNum,
  sunder,
  searchWord,
  lifeArray,
  gaguArray,
  intrsArray
) {
  const res = await axios.post("/api/db/service/getService", {
    start: startNum,
    sunder: sunder,
    searchWord: "%" + searchWord + "%",
    lifeArray: lifeArray,
    gaguArray: gaguArray,
    intrsArray: intrsArray,
  });
  return res.data;
}

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getService.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.sunder = action.payload.sunder;
      state.searchWord = action.payload.searchWord;
      state.serviceArray = action.payload.serviceArray;
      state.lifeArray = action.payload.lifeArray;
      state.gaguArray = action.payload.gaguArray;
      state.intrsArray = action.payload.intrsArray;
      state.endNum = action.payload.total;
    });
  },
});

export default serviceSlice.reducer;
