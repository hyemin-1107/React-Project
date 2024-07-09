import axiosInstance from "../axios/axiosInstance";

export const signIn = async (userData) => {
  try {
    const res = await axiosInstance.post("/user/", userData);
    const token = res.data.data;

    localStorage.setItem("token", token);

    return res.data;
  } catch (error) {
    console.error("로그인에 실패했습니다.", error);
    return null;
  }
};
