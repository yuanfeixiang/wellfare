// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   page: 1,
//   favoriteArray: [],
//   endNum: 0,
// };

// export const getFavorite = createAsyncThunk(
//   "favorite/getFavorite",
//   async (data) => {
//     const { page, sunder, searchWord, lifeArray, gaguArray, intrsArray } = data;

//     try {
//       const res = await getFavoriteListFromServer(
//         (page - 1) * 9,
//         sunder,
//         searchWord,
//         lifeArray,
//         gaguArray,
//         intrsArray
//       );

//       return {
//         page: page,
//         sunder: sunder,
//         searchWord: searchWord,
//         favoriteArray: res.favoriteArray,
//         lifeArray: lifeArray,
//         gaguArray: gaguArray,
//         intrsArray: intrsArray,
//         total: res.total,
//       };
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );

// async function getFavoriteListFromServer(
//   startNum,
//   sunder,
//   searchWord,
//   lifeArray,
//   gaguArray,
//   intrsArray
// ) {
//   const res = await axios.post("/api/db/favorite/getFavorite", {
//     start: startNum,
//     sunder: sunder,
//     searchWord: "%" + searchWord + "%",
//     lifeArray: lifeArray,
//     gaguArray: gaguArray,
//     intrsArray: intrsArray,
//   });
//   return res.data;
// }

// const favoriteSlice = createSlice({
//   name: "favorite",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getFavorite.fulfilled, (state, action) => {
//       state.page = action.payload.page;
//       state.sunder = action.payload.sunder;
//       state.searchWord = action.payload.searchWord;
//       state.favoriteArray = action.payload.favoriteArray;
//       state.lifeArray = action.payload.lifeArray;
//       state.gaguArray = action.payload.gaguArray;
//       state.intrsArray = action.payload.intrsArray;
//       state.endNum = action.payload.total;
//     });
//   },
// });

// export default favoriteSlice.reducer;
