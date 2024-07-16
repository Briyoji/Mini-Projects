import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name : 'utils',
  initialState : {},
  reducers : {
    setUtil : (state, action) => {
      state[action.payload.key] = action.payload.value;
    }
  }
});

export default utilSlice;