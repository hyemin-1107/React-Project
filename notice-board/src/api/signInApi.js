import axiosInstance from "../axios/axiosInstance";

export const signInApi = async (userData) => {
  try {
    const res = await axiosInstance.post("/user/", userData);
    console.log("API 응답", res.data);
    return res.data;
  } catch (error) {
    console.error("로그인에 실패했습니다.", error);
    return null;
  }
};
