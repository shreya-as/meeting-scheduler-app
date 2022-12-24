import { createSlice } from "@reduxjs/toolkit";
//initialize state
const initialState = {
  slots: {},
};
//create slots slice
const SlotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    getSlotDisplaySuccessAction: (state, { payload }) => {
      state.slots = payload;
      localStorage.setItem("params", JSON.stringify(payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSlotDisplaySuccessAction } = SlotSlice.actions;
// export reducer
export default SlotSlice.reducer;
