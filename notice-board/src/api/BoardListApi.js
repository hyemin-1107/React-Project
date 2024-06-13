import axiosInstance from "../axios/axiosInstance";

export const fetchBoardList = async (page) => {
  try {
    const response = await axiosInstance.get(
      `/board/list?page=${page}&limit=6`,
    );
    if (response.data.result === "success") {
      return {
        boardList: response.data.data,
        totalPages: response.data.totalPages,
      };
    } else {
      console.error("게시판 리스트를 가져오는데 실패했습니다");
    }
  } catch (error) {
    console.error("게시판 리스트를 가져오는데 실패했습니다", error);
  }
};
