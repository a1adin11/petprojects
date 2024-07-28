import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { act } from "react-dom/test-utils";

interface ISort {
  name: string;
  property: string;
}

interface IFilter {
  text: string;
  value: number;
}
interface ISortList {
  sortItem: ISort;
  filterItem: IFilter;
  searchValue: string;
}

const initialState: ISortList = {
  filterItem: {
    text: "Все",
    value: 0,
  },
  sortItem: {
    name: "алфавиту",
    property: "title",
  },
  searchValue: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPizzaFilterState(state, action) {
      state.filterItem = action.payload;
      console.log(state.sortItem);
    },
    setPizzaSortState(state, action) {
      state.sortItem = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setPizzaFilterState, setPizzaSortState, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
