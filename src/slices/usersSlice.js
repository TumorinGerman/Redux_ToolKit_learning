// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// BEGIN (write your solution here)
const usersAdapter = createEntityAdapter();

// По умолчанию: { ids: [], entities: {} }
const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
    // Если нужна дополнительная обработка, то создаем свою функцию
    removeUser: (state, { payload }) => {
      // ...
      // Внутри можем вызвать метод адаптера
      usersAdapter.removeOne(state, payload);
    },
    updateUser: usersAdapter.updateOne,
  },
});
export const { actions } = usersSlice;
export default usersSlice.reducer;
// END
