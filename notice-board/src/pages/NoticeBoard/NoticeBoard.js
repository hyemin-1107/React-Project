import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  const navigate = useNavigate();
  const location = useLocation();

  const navigateToCreateBoard = () => {
    navigate("/create-board");
  };

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };

  const onChangePage = (value) => {
    setPage(value);
  };

  const fetchBoard = async () => {
    try {
      const { boardList, totalPages } = await fetchBoardList(page);
      setBoardList(boardList);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("게시판 리스트를 가져오는데 실패했습니다:", error.message);
      alert(
        "게시판 목록을 가져오는 도중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
  };

  const onBoardClick = async (boardId) => {
    try {
      const boardDetail = await fetchBoardDetail(boardId);
      setSelectedBoard(boardDetail);
      setIsBoardDetailModal(true);
    } catch (error) {
      console.error("게시판 상세 정보를 가져오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchBoard();
    if (location.state?.reload) {
      fetchBoard(); // 페이지 재로딩 시 게시판 데이터 다시 불러오기
    }
  }, [page, location.state?.reload]);

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
        {boardList.map((boardList) => (
          <Section
            key={boardList.boardId}
            onClick={() => onBoardClick(boardList.boardId)}
          >
            <BoardImg src={boardList.imagePath} alt="첨부이미지" />
            <UserBoardContainer>
              <h2>{boardList.boardTitle}</h2>
              <p>{boardList.userId}</p>
              <span>{formattedDate(boardList.createAt)}</span>
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
