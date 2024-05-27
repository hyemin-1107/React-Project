import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { onClickModal } from "../../utills/onClickModal";
// import { format } from "date-fns";
import HeaderContents from "../../components/HeaderContents";
import BoardDetailView from "./components/BoardDetailView";
import Pagination from "./components/Pagination";
import axiosInstance from "../../services/axiosInstance";

const NoticeBoard = () => {
  const [isBoardDetailModal, setIsBoardDetailModal] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const navigateToCreateBoard = () => {
    navigate("/create-board");
  };

  // const currentDate = new Date();
  // const formattedDate = format(currentDate, "yyyy-MM-dd");
  const onChangePage = (value) => {
    setPage(value);
  };

  const BoardList = async (page) => {
    try {
      const response = await axiosInstance.get(
        `/board/list?page=${page}&limit=6`,
      );
      if (response.data.result === "success") setBoardList(response.data.data); // 서버에서 받은 데이터로 게시판 리스트 업데이트
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("게시판 리스트를 가져오는데 실패했습니다:", error);
    }
  };
  useEffect(() => {
    BoardList(page);
  }, [page]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("reload") === "true") {
      BoardList(page);
    } // 페이지 로드될 때 게시판 리스트 가져오기
  }, [location.search, page]);

  return (
    <>
      <HeaderContents />
      <BoardDetailView
        isBoardDetailModal={isBoardDetailModal}
        setIsBoardDetailModal={setIsBoardDetailModal}
        onClickCloseButton={() =>
          onClickModal(isBoardDetailModal, setIsBoardDetailModal)
        }
      />
      <BoardContainer>
        {boardList.map((board) => (
          <Section
            key={board.boardId}
            onClick={() => setIsBoardDetailModal(true)}
          >
            <BoardImg src={board.imagePath} alt="첨부이미지" />
            <UserBoardContainer>
              <h2>{board.boardTitle}</h2>
              <p>{board.userId}</p>
              <span>{new Date(board.createAt).toLocaleDateString()}</span>
            </UserBoardContainer>
          </Section>
        ))}
      </BoardContainer>
      <CreateButtonWrap>
        <Pagination
          onChangePage={onChangePage}
          page={page}
          totalPages={totalPages}
        />
        <NavigateToCreateBoard onClick={navigateToCreateBoard}>
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
