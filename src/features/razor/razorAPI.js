import axios from "axios";

const API = process.env.REACT_APP_URL || "/";

export const paymentIntent = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API + "payment/intent", {
                ...data
            },
                { withCredentials: true, }
            );
            resolve({ data: response.data });
        } catch (error) {
            reject({ message: error.response.data.message });
        }
    });
}
