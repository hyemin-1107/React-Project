import axiosInstance from "../axios/axiosInstance";
import { jwtDecode } from "jwt-decode";

export const signIn = async (userData) => {
  try {
    const res = await axiosInstance.post("/user/", userData);
    const token = res.data.data;
    const decodeToken = jwtDecode(token);
    const userId = decodeToken.userId;

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    return res.data;
  } catch (error) {
    console.error("로그인에 실패했습니다.", error);
    return null;
  }
};
