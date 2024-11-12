import { createSlice } from "@reduxjs/toolkit";

interface IAddtagItems {
  tagItems: string[];
}

const initialState: IAddtagItems = {
  tagItems: [],
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    onAddToTags: (state, action) => {
      state.tagItems = [...state.tagItems, action.payload];
    },
    onRemoveToTags: (state, action) => {
      state.tagItems = state.tagItems.filter((item) => item !== action.payload);
    },
    clearTags: (state) => {
      state.tagItems = [];
    },
  },
});

export const { onAddToTags, onRemoveToTags, clearTags } = tagsSlice.actions;

export default tagsSlice.reducer;
