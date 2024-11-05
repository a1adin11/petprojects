import { createSlice } from "@reduxjs/toolkit";

interface IAddtagItems {
  TagItems: string[];
}

const initialState: IAddtagItems = {
  TagItems: [],
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    onAddToTags: (state, action) => {
      state.TagItems = [...state.TagItems, action.payload];
    },
    onRemoveToTags: (state, action) => {
      state.TagItems = state.TagItems.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const { onAddToTags, onRemoveToTags } = tagsSlice.actions;

export default tagsSlice.reducer;
