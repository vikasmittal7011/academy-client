import axios from "axios";

const API = process.env.REACT_APP_URL;

export const fetchAllCourseEnrolls = (fetchType) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(API + "course/enroll/fetch?fetchType=" + fetchType,
                { withCredentials: true }
            );
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}
