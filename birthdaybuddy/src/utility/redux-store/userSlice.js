// eslint-disable-next-line
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAppError } from "./utilSlice";

const HOST_URI = process.env.REACT_APP_API_URL;

const initialState = {
  userData : {},
};

const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    updateUserData : (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers : builder => {
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.userData = action.payload.data;
    })
  }
});

export const getUserDetails = createAsyncThunk('auth/getUserDetails', async (_, { getState, dispatch }) => {
  const response = await fetch(`${HOST_URI}/auth/fetchUser`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${getState().auth.authData.token}`
    }
  })

  if (response.ok) {
    const data = await response.json();
    console.log("data", data);
    data.birthdate = data.birthdate.toString("dd-MM-yyyy").split("T")[0]
    return { data };
  } else {

    if (response.status === 500) {
      dispatch(setAppError("Internal Server Error!"))
      return { data: null };
    }
    
    return { data: null };
    }
})

export const updateUser = createAsyncThunk('auth/updateUserData', async (data, { getState, dispatch }) => {
  const response = await fetch(`${HOST_URI}/auth/updateUser`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${getState().auth.authData.token}`
    },
    body: JSON.stringify(data)
  })

  console.log("response", response);
})

export const { updateUserData } = userSlice.actions;
export default userSlice.reducer;