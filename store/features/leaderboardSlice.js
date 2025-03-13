import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaders: [
    { wallet: "0x20E...46a6", balance: "999,988,476" },
    { wallet: "0xF3B...23a3", balance: "4,099" },
    { wallet: "0xADf...f14D", balance: "3,000" },
    { wallet: "0xD72...1352", balance: "999" },
    { wallet: "0x9dD...A6c7", balance: "997" },
  ],
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaders: (state, action) => {
      state.leaders = action.payload;
    },
  },
});

export const { setLeaders } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
