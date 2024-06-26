import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { onClickModal } from "../../utills/onClickModal";
import { format } from "date-fns";
import HeaderContents from "../../components/HeaderContents";
import BoardDetailView from "./components/BoardDetailView";
import Pagination from "./components/Pagination";
import { fetchBoardList } from "../../api/BoardListApi";
import { fetchBoardDetail } from "../../api/BoardDetailApi";

const NoticeBoard = () => {
  const [isBoardDetailModal, setIsBoardDetailModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const paginationButton = 5;

  const navigate = useNavigate();

  const onClickNavigateToCreateBoardButton = () => {
    navigate("/create-board");
  };

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };

  const fetchBoard = async () => {
    const limit = paginationButton;
    const offset = (page - 1) * paginationButton;
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetchBoardList(offset, limit, userId);
      if (response.code === 200) {
        setBoardList(response.boardList);
        // 필요한 경우 totalPages를 API 응답에서 가져오도록 수정
        setTotalPages(response.totalPages); // totalCount가 API 응답에 포함된 경우
      }
    } catch (error) {
      console.error("게시판 리스트를 가져오는데 실패했습니다:", error.message);
      alert(
        "게시판 목록을 가져오는 도중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [page]);

  const openBoardDetailModal = async (boardId) => {
    try {
      const boardDetail = await fetchBoardDetail(boardId);
      setSelectedBoard(boardDetail);
      setIsBoardDetailModal(true);
    } catch (error) {
      console.error("게시판 상세 정보를 가져오는데 실패했습니다:", error);
    }
  };

  const closeBoardDetailModal = () => {
    setIsBoardDetailModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);

  return (
    <>
      <HeaderContents />
      <BoardDetailView
        isBoardDetailModal={isBoardDetailModal}
        setIsBoardDetailModal={setIsBoardDetailModal}
        selectedBoard={selectedBoard}
        onClickCloseButton={() =>
          onClickModal(isBoardDetailModal, setIsBoardDetailModal)
        }
      />
      <BoardContainer>
        {boardList && boardList.length > 0 ? (
          boardList.map((board) => (
            <Section
              key={board.boardId}
              onClick={() => openBoardDetailModal(board.boardId)}
            >
              <BoardImg src={board.imagePath} alt="첨부이미지" />
              <UserBoardContainer>
                <h2>{board.boardTitle}</h2>
                <p>{board.userId}</p>
                <span>
                  {formattedDate(board.createAt).toLocaleDateString()}
                </span>
              </UserBoardContainer>
            </Section>
          ))
        ) : (
          <div>No boards available</div>
        )}
      </BoardContainer>
      <CreateButtonWrap>
        <Pagination
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
        >
          {pageNumbers.map((_, index) => (
            <PageNumber
              key={index + 1}
              isActive={page === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageNumber>
          ))}
        </Pagination>
        <BoardDetailView
          boardId={selectedBoard}
          isBoardDetailModal={isBoardDetailModal}
          onClickCloseButton={closeBoardDetailModal}
        />
        <NavigateToCreateBoard onClick={onClickNavigateToCreateBoardButton}>
          게시물 올리기
        </NavigateToCreateBoard>
      </CreateButtonWrap>
    </>
  );
};

export default NoticeBoard;

const BoardContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  margin: 16px auto;

  width: 900px;
  height: 79vh;

  gap: 14px;
`;

const Section = styled.section`
  padding: 18px;

  height: 39vh;

  background-color: #fff;
  border: 1px solid #666;
  border-radius: 6px;

  box-shadow:
    rgba(14, 30, 37, 0.1) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.2) 0px 2px 16px 0px;
  box-sizing: border-box;

  cursor: pointer;

  &:hover {
    border: none;
  }
`;

const BoardImg = styled.img`
  width: 100%;
  height: 65%;

  border-radius: 6px;
  object-fit: cover;
`;

const UserBoardContainer = styled.div`
  margin-top: 10px;
  h2 {
  }
  p {
    margin-top: 16px;
    color: #666;
  }
`;

const CreateButtonWrap = styled.section`
  display: flex;
  justify-content: space-between;

  margin: 0 auto;

  width: 900px;
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

const PageNumber = styled.span`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  cursor: pointer;
  background: ${({ isActive }) => (isActive ? "#007bff" : "white")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  &:hover {
    background: #007bff;
    color: white;
  }
`;
