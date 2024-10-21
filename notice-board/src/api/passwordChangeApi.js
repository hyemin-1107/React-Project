import axiosInstance from "../axios/axiosInstance";

export const pwChangeUpdateApi = async (passwordData) => {
  const { userId, userPw, newUserPw } = passwordData;
  try {
    console.log("Request Data", { userId, userPw, newUserPw });
    const response = await axiosInstance.put("/user/", {
      userId,
      userPw,
      newUserPw,
    });
    console.log("비밀번호 Response", response);
    console.log("비밀번호 변경", response.data);
    return response.data;
  } catch (error) {
    console.error("비밀번호 변경 실패", error);
  }
};
