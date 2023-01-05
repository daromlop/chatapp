import { configureStore } from "@reduxjs/toolkit";
import visualsReducer from "../reducers/visualsSlice";
import userReducer from "../reducers/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    visuals: visualsReducer,
  },
});
