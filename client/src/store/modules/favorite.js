import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  centralFavoriteArray: [],
  localFavoriteArray: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    updateFavorite(state, action) {
      action.payload.sunder === 0
        ? state.centralFavoriteArray.filter((element) => {
            return element.servId == action.payload.servId;
          }).length < 1
          ? state.centralFavoriteArray.push(action.payload)
          : (state.centralFavoriteArray = state.centralFavoriteArray.filter(
              (element) => {
                return element.servId !== action.payload.servId;
              }
            ))
        : state.localFavoriteArray.filter((element) => {
            return element.servId == action.payload.servId;
          }).length < 1
        ? state.localFavoriteArray.push(action.payload)
        : (state.localFavoriteArray = state.localFavoriteArray.filter(
            (element) => {
              return element.servId !== action.payload.servId;
            }
          ));
    },
  },
  extraReducers: (builder) => {},
});

export const { updateFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
