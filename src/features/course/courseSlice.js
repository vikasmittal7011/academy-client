import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCourse, deteleCourse, fetchAllCourses, fetchCourseById, updateCourse } from "./courseAPI";

const initialState = {
    status: "idle",
    message: null,
    courseAdd: false,
    courses: [],
    course: {},
    deteleCourse: false,
    updateCourse: false,
};

export const createCourseAync = createAsyncThunk(
    "course/createCourse",
    async (course) => {
        const response = await createCourse(course);
        return response;
    }
);

export const updateCourseAync = createAsyncThunk(
    "course/updateCourse",
    async (course) => {
        const response = await updateCourse(course);
        return response;
    }
);

export const fetchAllCoursesAync = createAsyncThunk(
    "course/fetchAllCourses",
    async () => {
        const response = await fetchAllCourses();
        return response;
    }
);

export const fetchCourseByIdAync = createAsyncThunk(
    "course/fetchCourseById",
    async (id) => {
        const response = await fetchCourseById(id);
        return response;
    }
);

export const deteleCourseAync = createAsyncThunk(
    "course/deteleCourse",
    async (id) => {
        const response = await deteleCourse(id);
        return response;
    }
);

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
            state.courseAdd = false;
            state.deteleCourse = false;
            state.updateCourse = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCourseAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createCourseAync.fulfilled, (state) => {
                state.status = "idle";
                state.message = "Course Added Successfully Add!!";
                state.courseAdd = true;
            })
            .addCase(createCourseAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(fetchAllCoursesAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllCoursesAync.fulfilled, (state, action) => {
                state.status = "idle";
                state.courses = action.payload.data.courses;
            })
            .addCase(fetchAllCoursesAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(fetchCourseByIdAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCourseByIdAync.fulfilled, (state, action) => {
                state.status = "idle";
                state.course = action.payload.data.course;
            })
            .addCase(fetchCourseByIdAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(deteleCourseAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deteleCourseAync.fulfilled, (state) => {
                state.status = "idle";
                state.deteleCourse = true;
                state.message = "Delete Success";
            })
            .addCase(deteleCourseAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(updateCourseAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCourseAync.fulfilled, (state) => {
                state.status = "idle";
                state.updateCourse = true;
                state.message = "Update Success";
            })
            .addCase(updateCourseAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
    },
});

export const { clearMessage, retypeData, out } = courseSlice.actions;

export const selectcourse = (state) => state.course;

export default courseSlice.reducer;
