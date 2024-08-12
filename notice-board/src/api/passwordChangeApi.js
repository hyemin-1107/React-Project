import axiosInstance from "../axios/axiosInstance";

export const pwChangeUpdateApi = async (passwordData) => {
  const { userPw, newUserPw } = passwordData;
  try {
    const response = await axiosInstance.put("/user/", {
      userPw: userPw,
      newUserPw: newUserPw,
    });
    return response.data;
  } catch (error) {
    console.error("비밀번호 변경 실패", error);
  }
};
