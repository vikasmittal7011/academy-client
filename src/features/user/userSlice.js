import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserData, logoutUser, updateUserData, validateReferCode } from "./userAPI";

const initialState = {
  status: "idle",
  userBookings: [],
  user: JSON.parse(localStorage.getItem("user")) || {},
  message: "",
  updateUser: false,
  validReferCode: false,
};

export const fetchUserDataAsync = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await fetchUserData();
    return response;
  }
);

export const validateReferCodeAsync = createAsyncThunk(
  "user/validateReferCode",
  async (referCode) => {
    const response = await validateReferCode(referCode);
    return response;
  }
);

export const logoutUserAsync = createAsyncThunk(
  "user/logoutUser",
  async () => {
    const response = await logoutUser();
    return response;
  }
);

export const updateUserDataAsync = createAsyncThunk(
  "user/updateUserData",
  async (user) => {
    const response = await updateUserData(user);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.updateUser = false;
    },
    userOut: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload.data.user;
      })
      .addCase(fetchUserDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = {};
        state.message = action.payload.data.message;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(updateUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.updateUser = true;
        state.message = "Profile update successfully!!";
        state.user = action.payload.data.user;
      })
      .addCase(updateUserDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(validateReferCodeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validateReferCodeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.validReferCode = true;
        state.message = "Refer Code is valid";
      })
      .addCase(validateReferCodeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
  },
});

export const { clearMessage, userOut } = userSlice.actions;

export const selectuser = (state) => state.user;

export default userSlice.reducer;
