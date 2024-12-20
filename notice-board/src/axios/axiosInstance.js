import axios from "axios";

const defaultOptions = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(defaultOptions);

// 인터셉터를 추가하여 요청마다 최신 토큰을 헤더에 포함
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;

export const requestFailedMessageHandle = (failedMessage, message) => {
  console.error(`${failedMessage} : ${message}`);
};

export const errorMessageHandle = (errorName, errorMessage) => {
  console.error(`${errorName} : ${errorMessage}`);
};
