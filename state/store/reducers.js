import { combineReducers } from "@reduxjs/toolkit";
import schedulerSlice from "../redux/scheduler/schedulerSlice";
export const rootReducer = combineReducers({
  scheduler: schedulerSlice,
});
