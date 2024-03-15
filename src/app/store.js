import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import courseReducer from "../features/course/courseSlice";
import eventReducer from "../features/event/eventSlice";
import razorReducer from "../features/razor/razorSlice";
import eventEnrollReducer from "../features/event-enroll/eventEnrollSlice";
import courseEnrollReducer from "../features/course-enroll/courseEnrollSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        course: courseReducer,
        event: eventReducer,
        razor: razorReducer,
        eventEnroll: eventEnrollReducer,
        courseEnroll: courseEnrollReducer,
    },
});
