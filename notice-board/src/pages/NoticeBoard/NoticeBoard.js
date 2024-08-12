import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchBoardListApi } from "../../api/boardListApi";
import {
  fetchBoardDetailApi,
  fetchCommentsApi,
} from "../../api/boardDetailApi";
import { noticeBoardObject } from "../../utills/message";
import HeaderContents from "../../components/HeaderContents";
import BoardDetailView from "./components/BoardDetailView";
import BoardListContainer from "./components/BoardListContainer";
// import CommentList from "./components/CommentList";
import CustomPagination from "./components/Pagination";

const NoticeBoard = () => {
  const [isBoardDetailModal, setIsBoardDetailModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState();

  const limitButton = 6;
  const navigate = useNavigate();
  const onClickNavigateToCreateBoardButton = () => {
    navigate("/create-board");
  };

  const fetchComments = async (boardId) => {
    const commentData = await fetchCommentsApi(boardId);
    if (commentData) {
      setComments(commentData); // 댓글 데이터 설정
    }
  };

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return date;
  };

  const { fetchBoardError, boardDetailError } = noticeBoardObject;
  const fetchAllBoardList = async () => {
    const limit = limitButton;
    const offset = (page - 1) * limitButton;

    try {
      const response = await fetchBoardListApi(offset, limit);
      if (response) {
        setBoardList(response.boardList);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      // console.error("게시판 리스트를 가져오는데 실패했습니다:", error.message);
      alert(fetchBoardError);
    }
  };

  const openBoardDetailModal = async (boardId) => {
    try {
      const boardDetail = await fetchBoardDetailApi(boardId);
      setSelectedBoard(boardDetail);
      setIsBoardDetailModal(true);
      fetchComments(boardId);
    } catch (error) {
      // console.error("게시판 상세 정보를 가져오는데 실패했습니다:", error);
      alert(boardDetailError);
    }
  };

  const closeBoardDetailModal = () => {
    setIsBoardDetailModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchAllBoardList();
  }, [page]);

  return (
    <>
      <HeaderContents />
      <BoardDetailView
        isBoardDetailModal={isBoardDetailModal}
        setIsBoardDetailModal={setIsBoardDetailModal}
        selectedBoard={selectedBoard}
        onClickCloseButton={closeBoardDetailModal}
      />
      <ContentContainer>
        <BoardListContainer
          boardList={boardList}
          openBoardDetailModal={openBoardDetailModal}
          formattedDate={formattedDate}
        />
        <BoardDetailView
          isBoardDetailModal={isBoardDetailModal}
          selectedBoard={selectedBoard}
          onClickCloseButton={closeBoardDetailModal}
        />
        <CreateButtonWrap>
          <CustomPagination
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
          <NavigateToCreateBoard onClick={onClickNavigateToCreateBoardButton}>
            게시물 올리기
          </NavigateToCreateBoard>
        </CreateButtonWrap>
      </ContentContainer>
    </>
  );
};

export default NoticeBoard;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 0 auto;

  width: 900px;
`;

const CreateButtonWrap = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

const NavigateToCreateBoard = styled.button`
  padding: 10px 30px;

  font-size: 16px;
  font-weight: bold;

  border: 1px solid #666;
  border-radius: 4px;

  color: white;
  background-color: #66bacf;

  box-shadow:
    inset 0px -2px 8px rgba(0, 0, 0, 0.1),
    2px 3px 10px rgba(0, 0, 0, 0.1);

  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #3a809b;
  }
`;
