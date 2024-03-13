import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateOTP, loginUser, passwrodRequest, passwrodReset, registerUser } from "./authAPI";

const initialState = {
    status: "idle",
    message: null,
    sendMail: false,
    resetPassword: false,
    sendOTP: false,
    registerSuccess: false,
    loginSuccess: false,
    logoutSuccess: false,
    passwordResetRequest: false,
    passwordReset: false,
    userData: {},
};

export const generateOTPAync = createAsyncThunk(
    "auth/generateOTP",
    async (userData) => {
        const response = await generateOTP(userData);
        return response;
    }
);

export const registerUserAync = createAsyncThunk(
    "auth/registerUser",
    async (otp) => {
        const response = await registerUser(otp);
        return response;
    }
);

export const loginUserAync = createAsyncThunk(
    "auth/loginUser",
    async (userData) => {
        const response = await loginUser(userData);
        return response;
    }
);

export const passwrodRequestAync = createAsyncThunk(
    "auth/passwrodRequest",
    async (email) => {
        const response = await passwrodRequest(email);
        return response;
    }
);

export const passwrodResetAync = createAsyncThunk(
    "auth/passwrodReset",
    async (data) => {
        const response = await passwrodReset(data);
        return response;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
        retypeData: (state) => {
            state.sendOTP = false;
        },
        out: (state) => {
            state.sendMail = false;
            state.resetPassword = false;
            state.sendOTP = false;
            state.registerSuccess = false;
            state.loginSuccess = false;
            state.logoutSuccess = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(passwrodResetAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(passwrodResetAync.fulfilled, (state) => {
                state.status = "idle";
                state.passwordReset = true;
                state.message = "Password Reset Success!!";
            })
            .addCase(passwrodResetAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(passwrodRequestAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(passwrodRequestAync.fulfilled, (state) => {
                state.status = "idle";
                state.passwordResetRequest = true;
                state.message = "Request sent to your email";
            })
            .addCase(passwrodRequestAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(loginUserAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUserAync.fulfilled, (state) => {
                state.status = "idle";
                state.loginSuccess = true;
                state.userData = {};
                state.message = "Loing is suucess!!";
            })
            .addCase(loginUserAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(registerUserAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerUserAync.fulfilled, (state) => {
                state.status = "idle";
                state.registerSuccess = true;
                state.sendOTP = false;
                state.userData = {};
                state.message = "Registration is suucess!!";
            })
            .addCase(registerUserAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
            .addCase(generateOTPAync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(generateOTPAync.fulfilled, (state, action) => {
                state.status = "idle";
                state.userData = action.payload.userData;
                state.sendOTP = true;
                state.message = "OTP send Suucess!!";
            })
            .addCase(generateOTPAync.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.error.message;
            })
    },
});

export const { clearMessage, retypeData, out } = authSlice.actions;

export const selectauth = (state) => state.auth;

export default authSlice.reducer;
