import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import courseReducer from "../features/course/courseSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        course: courseReducer,
    },
});
