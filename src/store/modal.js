import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
  post: { title: "", content: "" },
  isEdit: false,
  editId: "",
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalToggle(state) {
      state.isOpen = !state.isOpen;
    },
    editModal(state, action) {
      state.post = action.payload;
    },
    editModeToggle(state) {
      state.isEdit = !state.isEdit;
    },
    editId(state, action) {
      state.editId = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const modalAction = modalSlice.actions;
