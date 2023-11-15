import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  page: 1,
  sunder: 0,
  searchWord: "",
  serviceArray: [],
  lifeArrayList: [],
  gaguArrayList: [],
  intrsArrayList: [],
  sidoArrayList: [],
  gunguArrayList: [],
  lifeArray: [],
  gaguArray: [],
  intrsArray: [],
  age: 0,
  sido: "전체",
  gungu: "전체",
  centralEndNum: 0,
  localEndNum: 0,
  totalEndNum: 0,
  selectedServiceArray: [],
  detailArrayList: [],
};

export const getService = createAsyncThunk(
  "service/getService",
  async (data) => {
    const {
      page,
      sunder,
      searchWord,
      lifeArray,
      gaguArray,
      intrsArray,
      age,
      sido,
      gungu,
    } = data;

    try {
      const res = await getServiceListFromServer(
        (page - 1) * 9,
        sunder,
        searchWord,
        lifeArray,
        gaguArray,
        intrsArray,
        age,
        sido,
        gungu
      );

      return {
        page: page,
        sunder: sunder,
        searchWord: searchWord,
        serviceArray: res.serviceArray,
        lifeArrayList: res.lifeArrayList,
        gaguArrayList: res.gaguArrayList,
        intrsArrayList: res.intrsArrayList,
        sidoArrayList: res.sidoArrayList,
        lifeArray: lifeArray,
        gaguArray: gaguArray,
        intrsArray: intrsArray,
        age: age,
        sido: sido,
        gungu: gungu,
        centralTotal: res.centralTotal,
        localTotal: res.localTotal,
        total: res.total,
      };
    } catch (err) {
      console.error(err);
    }
  }
);

export const getEachService = createAsyncThunk(
  "service/getEachService",
  async (data) => {
    const { servId } = data;

    try {
      const res = await getEachServiceListFromServer(servId);

      return {
        selectedServiceArray: res.selectedServiceArray,
        detailArrayList: res.detailArrayList
      };
    } catch (err) {
      console.error(err);
    }
  }
);

export const getGunguArrayList = createAsyncThunk(
  "service/getGunguArrayList",
  async (data) => {
    const { sido } = data;
    try {
      const res = await axios.post("/api/db/service/getGunguArrayList", {
        sido: sido,
      });

      return {
        gunguArrayList: res.data.gunguArrayList,
      };
    } catch (err) {
      console.error(err);
    }
  }
);

export const resetFilter = createAsyncThunk("service/resetFilter", async () => {
  const res = await getServiceListFromServer(
    0,
    0,
    "",
    [],
    [],
    [],
    0,
    "전체",
    "전체"
  );

  return {
    serviceArray: res.serviceArray,
    lifeArrayList: res.lifeArrayList,
    gaguArrayList: res.gaguArrayList,
    intrsArrayList: res.intrsArrayList,
    sidoArrayList: res.sidoArrayList,
    centralTotal: res.centralTotal,
    localTotal: res.localTotal,
    total: res.total,
  };
});

async function getServiceListFromServer(
  startNum,
  sunder,
  searchWord,
  lifeArray,
  gaguArray,
  intrsArray,
  age,
  sido,
  gungu
) {
  const res = await axios.post("/api/db/service/getService", {
    start: startNum,
    sunder: sunder,
    searchWord: "%" + searchWord + "%",
    lifeArray: lifeArray,
    gaguArray: gaguArray,
    intrsArray: intrsArray,
    age: age,
    sido: sido,
    gungu: gungu,
  });
  return res.data;
}

async function getEachServiceListFromServer(servId) {
  const res = await axios.post("/api/db/service/getEachService", {
    servId: servId,
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
      state.lifeArrayList = action.payload.lifeArrayList;
      state.gaguArrayList = action.payload.gaguArrayList;
      state.intrsArrayList = action.payload.intrsArrayList;
      state.sidoArrayList = action.payload.sidoArrayList;
      state.lifeArray = action.payload.lifeArray;
      state.gaguArray = action.payload.gaguArray;
      state.intrsArray = action.payload.intrsArray;
      state.age = action.payload.age;
      state.sido = action.payload.sido;
      state.gungu = action.payload.gungu;
      state.centralEndNum = action.payload.centralTotal;
      state.localEndNum = action.payload.localTotal;
      state.totalEndNum = action.payload.total;
    });
    builder.addCase(getGunguArrayList.fulfilled, (state, action) => {
      state.gunguArrayList = action.payload.gunguArrayList;
    });
    builder.addCase(resetFilter.fulfilled, (state, action) => {
      state.page = 1;
      state.sunder = 0;
      state.searchWord = "";
      state.serviceArray = action.payload.serviceArray;
      state.lifeArrayList = action.payload.lifeArrayList;
      state.gaguArrayList = action.payload.gaguArrayList;
      state.intrsArrayList = action.payload.intrsArrayList;
      state.sidoArrayList = action.payload.sidoArrayList;
      state.lifeArray = [];
      state.gaguArray = [];
      state.intrsArray = [];
      state.age = 0;
      state.sido = "전체";
      state.gungu = "전체";
      state.centralEndNum = action.payload.centralTotal;
      state.localEndNum = action.payload.localTotal;
      state.totalEndNum = action.payload.total;
    });
    builder.addCase(getEachService.fulfilled, (state, action) => {
      state.selectedServiceArray = action.payload.selectedServiceArray;
      state.detailArrayList = action.payload.detailArrayList;
    });
  },
});

export default serviceSlice.reducer;
