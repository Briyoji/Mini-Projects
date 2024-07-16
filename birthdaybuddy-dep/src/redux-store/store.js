import { configureStore } from "@reduxjs/toolkit";

import utilSlice from "./utilSlice";

const store = configureStore({
  reducer : {
    utils : utilSlice.reducer
  }
});

export default store;