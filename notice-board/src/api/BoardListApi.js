import axiosInstance from "../axios/axiosInstance";

export const fetchBoardList = async (offset, limit, userId) => {
  try {
    const response = await axiosInstance.get(`/board/list`, {
      params: {
        offset,
        limit,
        userId,
      },
    });
    const responseData = response.data;
    if (responseData.code !== 200) {
      return {
        boardList: response.data.data,
        totalPages: response.data.totalPages,
      };
    } else {
      console.error("예상치 못한 상태 코드:", response.status);
    }
  } catch (error) {
    console.error("게시판 목록을 불러오는데 실패했습니다:", error.message);
  }
};
