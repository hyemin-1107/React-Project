import axiosInstance, {
  errorMessageHandle,
  requestFailedMessageHandle,
} from "../axios/axiosInstance";
import { noticeBoardObject } from "../utills/message";

// 게시물 상세 정보 가져오기
export const fetchBoardDetailApi = async (boardId) => {
  const { boardDetailError, fetchBoardError } = noticeBoardObject;
  try {
    const response = await axiosInstance.get(`/board/${boardId}`);
    console.log("게시물 상세 정보", response.data);
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      requestFailedMessageHandle(boardDetailError);
    }
  } catch (error) {
    errorMessageHandle(fetchBoardError, error);
    alert(boardDetailError);
  }
};

// 댓글 목록 가져오기
export const fetchCommentsApi = async (boardId, token) => {
  try {
    const response = await axiosInstance.get(`/comment/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response Comment", response.data);
    if (response.data.code === 200) {
      console.log("댓글", response.data);
      return response.data.data;
    } else {
      console.error("댓글 목록을 가져오는데 실패했습니다");
      return [];
    }
  } catch (error) {
    console.error("댓글 목록을 가져오는데 실패했습니다", error);
    return [];
  }
};

// 댓글 추가하기
// 수정필요
// 코드번호로 if 관리
export const postCommentApi = async (boardId, comment) => {
  try {
    const response = await axiosInstance.post(`/comment/`, {
      boardId,
      comment,
    });

    console.log("Response data", response.data);
    console.log("boardId", boardId, "comment", comment);

    if (response.data.code === 200) {
      return response;
    } else {
      console.error("댓글을 추가하는데 실패했습니다");
    }
  } catch (error) {
    console.error("댓글을 추가하는데 실패했습니다 error", error);
  }
};

// 댓글 수정하기
export const updateCommentApi = async (commentId, comment) => {
  try {
    const response = await axiosInstance.put(`/comment/${commentId}`, {
      comment,
    });
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      console.error("댓글을 수정하는데 실패했습니다");
    }
  } catch (error) {
    console.error("댓글을 수정하는데 실패했습니다", error);
  }
};

// 댓글 삭제하기
export const deleteCommentApi = async (commentId) => {
  try {
    const response = await axiosInstance.delete(`/comment/${commentId}`);
    if (response.data.code === 200) {
      return true;
    } else {
      console.error("댓글을 삭제하는데 실패했습니다");
    }
  } catch (error) {
    console.error("댓글을 삭제하는데 실패했습니다", error);
  }
};

export const fetchBoardListApi = async (offset, limit, authToken) => {
  const { fetchBoardError } = noticeBoardObject;
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

    if (response.data.code === 200) {
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
    alert(fetchBoardError);
  }
};

export const deleteBoardApi = async (boardId, authToken) => {
  try {
    const response = await axiosInstance.delete(`/board/${boardId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.data.code === 200) {
      console.log("게시글 삭제 성공", response);
    } else {
      console.error(response.status);
    }
  } catch (error) {
    console.error("게시글 삭제에 실패했습니다:", error.message);
  }
};
