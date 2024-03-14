import axios from "axios";

const API = process.env.REACT_APP_URL;

export const createCourse = async (course) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API + "course", {
                ...course
            },
                { withCredentials: true, }
            );
            resolve({ success: response.data.success });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const fetchAllCourses = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(API + "course");
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const fetchCourseById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(API + "course/" + id);
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const deteleCourse = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(API + "course/" + id, { withCredentials: true });
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}

export const updateCourse = async (course) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.put(API + "course/" + course.id,
                { ...course },
                { withCredentials: true }
            );
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}
