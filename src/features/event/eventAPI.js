import axios from "axios";

const API = process.env.REACT_APP_URL;

export const createEvent = (event) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API + "event", {
                ...event
            },
                { withCredentials: true, }
            );
            resolve({ success: response.data.success });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const fetchAllEvents = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(API + "event");
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const fetchEventById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(API + "event/" + id);
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const updateEvent = async (event) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.put(API + "event/" + event.id,
                { ...event },
                { withCredentials: true }
            );
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const deteleEvent = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(API + "event/" + id, { withCredentials: true });
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}