import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentIntent } from "./razorAPI";

const initialState = {
    status: "idle",
    data: {},
};

export const paymentIntentAync = createAsyncThunk(
    "razor/paymentIntent",
    async (data) => {
        const response = await paymentIntent(data);
        return response;
    }
);


export const razorSlice = createSlice({
    name: "razor",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(paymentIntentAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(paymentIntentAync.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload.data
            })
            .addCase(paymentIntentAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
    },
});

export const { clearMessage } = razorSlice.actions;

export const selectrazor = (state) => state.razor;

export default razorSlice.reducer;
