import axiosInstance from "../axios/axiosInstance";

export const signUp = async (userData) => {
  try {
    const res = await axiosInstance.post("/user/signup", userData);
    return res.data;
  } catch (error) {
    console.error("가입에 실패했습니다.", error);
  }
};
