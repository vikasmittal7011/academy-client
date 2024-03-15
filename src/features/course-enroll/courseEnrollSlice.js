import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllCourseEnrolls } from "./courseEnrollAPI";

const initialState = {
    status: "idle",
    message: null,
    courseEnrolls: [],
};

export const fetchAllCourseEnrollsAync = createAsyncThunk(
    "courseEnroll/fetchAllCourseEnrolls",
    async (fetchType) => {
        const response = await fetchAllCourseEnrolls(fetchType);
        return response;
    }
);


export const courseEnrollSlice = createSlice({
    name: "courseEnroll",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCourseEnrollsAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllCourseEnrollsAync.fulfilled, (state, action) => {
                state.status = "idle";
                state.courseEnrolls = action.payload.data.coursesEnrolls;
            })
            .addCase(fetchAllCourseEnrollsAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })

    },
});

export const { clearMessage } = courseEnrollSlice.actions;

export const selectcoursernroll = (state) => state.courseEnroll;

export default courseEnrollSlice.reducer;
