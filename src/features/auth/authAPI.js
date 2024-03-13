import axios from "axios";

const API = process.env.REACT_APP_URL;

export const generateOTP = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API + "auth/otp", {
                ...userData
            },
                { withCredentials: true, }
            );
            resolve({ success: response.data.success, userData });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const registerUser = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API + "auth", {
                ...userData
            },
                { withCredentials: true, }
            );
            resolve({ success: response.data.success });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const loginUser = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API + "auth/login", {
                ...userData
            },
                { withCredentials: true, }
            );
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const passwrodRequest = async (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API + "auth/reset-password-request", {
                ...email
            },
                { withCredentials: true, }
            );
            resolve({ success: response.data.success });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const passwrodReset = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API + "auth/reset-password", {
                ...data
            },
                { withCredentials: true, }
            );
            resolve({ success: response.data.success });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}
