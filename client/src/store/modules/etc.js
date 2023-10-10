import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  etcServiceList: [],
  etcId: 0,
};

// export const plusEtcId = createAsyncThunk("etc/plusEtcId", async () => {
//   try {
//     id = id + 1;

//     return {
//       _id: res.data.id,
//     };
//   } catch (err) {
//     console.error(err);
//   }
// });

export const getEtcService = createAsyncThunk(
  "etc/getEtcService",
  async (data) => {
    try {
      const { sunder } = data;
      const res = await axios.post("/api/db/etc/getEtcService", {
        sunder: sunder,
      });
      console.log(res);

      return {
        _service: res.data.service,
      };
    } catch (err) {
      console.error(err);
    }
  }
);

const etcSlice = createSlice({
  name: "etc",
  initialState,
  reducers: {
    plusEtcId(state) {
      state.etcId = state.etcId + 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEtcService.fulfilled, (state, action) => {
      state.etcServiceList = action.payload._service;
    });
  },
});

export const { plusEtcId } = etcSlice.actions;
export default etcSlice.reducer;
