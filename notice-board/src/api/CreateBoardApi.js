import axiosInstance from "../axios/axiosInstance";

export const createBoard = async (formUserData) => {
  try {
    const response = await axiosInstance.post("/board/", formUserData);
    return response.data;
  } catch (error) {
    console.error("게시물 작성 실패", error);
  }
};
