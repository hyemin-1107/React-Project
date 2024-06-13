import axiosInstance from "../axios/axiosInstance";

export const signIn = async (userData) => {
  try {
    const res = await axiosInstance.post("/user/", userData);
    return res.data;
  } catch (error) {
    console.error("로그인에 실패했습니다.", error);
  }
};
