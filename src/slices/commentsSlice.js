// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// BEGIN (write your solution here)
const commentsAdapter = createEntityAdapter();
const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: commentsAdapter.addOne,
    addComments: commentsAdapter.addMany,
  },
});

export const selectors = commentsAdapter.getSelectors(
  (state) => state.commentsReducer
);
export const { actions } = commentsSlice;
export default commentsSlice.reducer;
// END
