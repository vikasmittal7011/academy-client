import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEvent, deteleEvent, fetchAllEvents, fetchEventById, updateEvent } from "./eventAPI";

const initialState = {
    status: "idle",
    message: null,
    eventAdd: false,
    eventUpdate: false,
    eventDelete: false,
    events: [],
    event: {},
};

export const createEventAync = createAsyncThunk(
    "event/createEvent",
    async (event) => {
        const response = await createEvent(event);
        return response;
    }
);

export const fetchAllEventsAync = createAsyncThunk(
    "event/fetchAllEvents",
    async () => {
        const response = await fetchAllEvents();
        return response;
    }
);

export const fetchEventByIdAync = createAsyncThunk(
    "event/fetchEventById",
    async (id) => {
        const response = await fetchEventById(id);
        return response;
    }
);

export const updateEventAync = createAsyncThunk(
    "event/updateEvent",
    async (event) => {
        const response = await updateEvent(event);
        return response;
    }
);

export const deteleEventAync = createAsyncThunk(
    "event/deteleEvent",
    async (id) => {
        const response = await deteleEvent(id);
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
            state.eventUpdate = false;
            state.eventDelete = false;
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
            .addCase(fetchAllEventsAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllEventsAync.fulfilled, (state, action) => {
                state.status = "idle";
                state.events = action.payload.data.events;
            })
            .addCase(fetchAllEventsAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(fetchEventByIdAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEventByIdAync.fulfilled, (state, action) => {
                state.status = "idle";
                state.event = action.payload.data.event;
            })
            .addCase(fetchEventByIdAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(updateEventAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateEventAync.fulfilled, (state) => {
                state.status = "idle";
                state.message = "Event update success";
                state.eventUpdate = true;
            })
            .addCase(updateEventAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(deteleEventAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deteleEventAync.fulfilled, (state) => {
                state.status = "idle";
                state.message = "Event delete success";
                state.eventDelete = true;
            })
            .addCase(deteleEventAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
    },
});

export const { clearMessage } = eventSlice.actions;

export const selectevent = (state) => state.event;

export default eventSlice.reducer;
