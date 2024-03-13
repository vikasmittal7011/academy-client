import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEvent } from "./eventAPI";

const initialState = {
    status: "idle",
    message: null,
    eventAdd: false,
};

export const createEventAync = createAsyncThunk(
    "event/createEvent",
    async (event) => {
        const response = await createEvent(event);
        return response;
    }
);

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
            state.eventAdd = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEventAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createEventAync.fulfilled, (state) => {
                state.status = "idle";
                state.message = "Event Added Successfully Add!!";
                state.eventAdd = true;
            })
            .addCase(createEventAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
    },
});

export const { clearMessage } = eventSlice.actions;

export const selectevent = (state) => state.event;

export default eventSlice.reducer;
