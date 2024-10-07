import axiosInstance from "../axios/axiosInstance";

export const signInApi = async (userData) => {
  try {
    const res = await axiosInstance.post("/user/", userData);
    const token = res.data.data;

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userData.userId);

    return res.data;
  } catch (error) {
    console.error("로그인에 실패했습니다.", error);
    return null;
  }
};
