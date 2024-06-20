import axiosInstance from "../axios/axiosInstance";

export const signIn = async (userData) => {
  try {
    const res = await axiosInstance.post("/user/", userData);
    if (res.data.result === "success") {
      localStorage.setItem("currentUserId", res.data.data.userId); // userId를 로컬 스토리지에 저장
      return res.data;
    }
  } catch (error) {
    console.error("로그인에 실패했습니다.", error);
  }
};
