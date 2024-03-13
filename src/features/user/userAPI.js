import axios from "axios";

const API = process.env.REACT_APP_URL;

export const fetchUserData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(API + "user",
        { withCredentials: true, }
      );
      resolve({ data: response.data });
    } catch (error) {
      reject({ message: error.response.data.message });
    }
  });
}

export const logoutUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(API + "auth/logout", {
        method: "POST",
        credentials: "include"
      })
      const data = await response.json();
      if (data.success) {
        resolve({ data: data });
      } else {
        reject({ message: data.message });
      }
    } catch (error) {
    }
  });
}
