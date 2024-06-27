import axiosInstance from "../axios/axiosInstance";

export const signIn = async (userData) => {
  try {
    const res = await axiosInstance.post("/user/", userData);
    const { token } = res.data; // 서버에서 받은 토큰
    localStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장
    return res.data;
  } catch (error) {
    console.error("로그인에 실패했습니다.", error);
    return null;
  }
};
