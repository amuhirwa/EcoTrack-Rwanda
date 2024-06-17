import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";

function createAxiosInstance() {
  const info = localStorage.getItem("persist:root");
  let token = "";
  if (info) {
    const userInfo = JSON.parse(JSON.parse(info).usersLogin);
    token = userInfo.access;
  }
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorObj = error;
      if (errorObj.response?.status == 401) {
        window.location.href = "/auth";
      } else {
        const errorData = errorObj.response?.data;
        const errorMessage = errorData
          ? errorData.message || errorData.error || errorObj.message
          : "Failed";
        toast.error(errorMessage);
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export const api = () => createAxiosInstance();

export default createAxiosInstance;