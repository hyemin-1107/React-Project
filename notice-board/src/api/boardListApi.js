import axiosInstance from "../axios/axiosInstance";

export const fetchBoardListApi = async (offset, limit) => {
  try {
    const response = await axiosInstance.get(`/board/list`, {
      params: {
        offset,
        limit,
      },
    });
    if (response.status === 200) {
      console.log("API", response.data);
      return {
        boardList: response.data.data,
        totalCount: response.data.totalCount,
      };
    } else {
      console.error("예상치 못한 상태 코드:", response.status);
      return null;
    }
  } catch (error) {
    console.error("게시판 목록을 불러오는데 실패했습니다:", error.message);
    return null;
  }
};
