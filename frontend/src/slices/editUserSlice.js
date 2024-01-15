import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editUserInfo: localStorage.getItem("editUserInfo")
    ? JSON.parse(localStorage.getItem("editUserInfo"))
    : null,
};

const editUserSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    setEditUserCredentials: (state, action) => {
      state.editUserInfo = action.payload;
      localStorage.setItem("editUserInfo", JSON.stringify(action.payload));
    },
    removeEditUserCredentials: (state, action) => {
      state.editUserInfo = null;
      localStorage.removeItem("editUserInfo");
    },
  },
});

export const { setEditUserCredentials, removeEditUserCredentials, logout } =
  editUserSlice.actions;

export default editUserSlice.reducer;
