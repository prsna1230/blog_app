import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    blog: blogSlice,
  },
});
