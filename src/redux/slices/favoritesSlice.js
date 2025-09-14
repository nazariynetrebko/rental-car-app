import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/localStorage";

const FAVORITES_KEY = "favorites";

const initialState = loadState(FAVORITES_KEY, []);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const exists = state.find((c) => c.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        saveState(FAVORITES_KEY, state);
      }
    },
    removeFromFavorites(state, action) {
      const newState = state.filter((c) => c.id !== action.payload);
      saveState(FAVORITES_KEY, newState);
      return newState;
    },
    clearFavorites(state, action) {
      saveState(FAVORITES_KEY, []);
      return [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
