import { configureStore } from "@reduxjs/toolkit";
import leaderboardReducer from "./features/leaderboardSlice"; // Import leaderboard reducer

const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer, // Register leaderboard slice
  },
});

export default store;
