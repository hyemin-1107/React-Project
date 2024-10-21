import axiosInstance from "../axios/axiosInstance";

export const fetchBoardListApi = async (offset, limit, authToken) => {
  try {
    const response = await axiosInstance.get(`/board/list`, {
      params: {
        offset,
        limit,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      console.log("API", response.data);

      return {
        boardList: response.data.data,
        totalCount: response.data.totalCount,
      };
    } else {
      console.error(response.status);
    }
  } catch (error) {
    console.error("게시판 목록을 불러오는데 실패했습니다:", error.message);
  }
};

export const deleteBoardApi = async (boardId, authToken) => {
  try {
    const response = await axiosInstance.delete(`/board/${boardId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.status === 200) {
      console.log("게시글 삭제 성공", response);
    } else {
      console.error(response.status);
    }
  } catch (error) {
    console.error("게시글 삭제에 실패했습니다:", error.message);
  }
};
