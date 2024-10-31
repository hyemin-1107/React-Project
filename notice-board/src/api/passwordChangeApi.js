import axiosInstance from "../axios/axiosInstance";

export const pwChangeUpdateApi = async (passwordData) => {
  const { userId, userPw, newUserPw } = passwordData;
  try {
    const response = await axiosInstance.post("/user/", {
      userId,
      userPw,
      newUserPw,
    });

    if (response.data.code === 200) {
      console.log("비밀번호 변경 성공", response.data.message);
      return response.data;
    } else {
      console.error("비밀번호 변경 실패", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("요청 중 에러", error.message);
    return null;
  }
};
