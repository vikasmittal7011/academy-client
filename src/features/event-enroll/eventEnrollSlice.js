import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAlleventEnrolls } from "./eventEnrollAPI";

const initialState = {
    status: "idle",
    message: null,
    eventEnrolls: [],
};

export const fetchAlleventEnrollsAync = createAsyncThunk(
    "eventEnroll/fetchAlleventEnrolls",
    async (fetchType) => {
        const response = await fetchAlleventEnrolls(fetchType);
        return response;
    }
);


export const eventEnrollSlice = createSlice({
    name: "eventEnroll",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlleventEnrollsAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAlleventEnrollsAync.fulfilled, (state, action) => {
                state.status = "idle";
                state.eventEnrolls = action.payload.data.eventEnrolls;
            })
            .addCase(fetchAlleventEnrollsAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })

    },
});

export const { clearMessage } = eventEnrollSlice.actions;

export const selecteventrnroll = (state) => state.eventEnroll;

export default eventEnrollSlice.reducer;
