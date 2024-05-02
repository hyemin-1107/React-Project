import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderContents from "../../components/HeaderContents";
import Pagination from "./components/Pagination";
import styled from "styled-components";
import img_photo from "../../images/img_photo.jpg";

const NoticeBoard = (props) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { totalPages } = props;
  const navigateToCreateBoard = () => {
    navigate("/create-board");
  };
  const navigateBoardDetailView = () => {
    navigate("/board-detail-view");
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onChangePage = (value) => {
    setPage(value);
  };
  return (
    <>
      <HeaderContents />
      <BoardContainer>
        {/* TODO 입력함수 가데이터 사용 */}
        <Section onClick={navigateBoardDetailView}>
          <UserBoardImg src={img_photo} alt="첨부이미지" />
          <UserBoardContainer>
            <h2>제목</h2>
            <p>작성자</p>
            <span>{getCurrentDate()}</span>
          </UserBoardContainer>
        </Section>
        <Section onClick={navigateBoardDetailView}>
          <UserBoardImg src={img_photo} alt="" />
          <UserBoardContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </UserBoardContainer>
        </Section>
        <Section onClick={navigateBoardDetailView}>
          <UserBoardImg src={img_photo} alt="" />
          <UserBoardContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </UserBoardContainer>
        </Section>
        <Section onClick={navigateBoardDetailView}>
          <UserBoardImg src={img_photo} alt="" />
          <UserBoardContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </UserBoardContainer>
        </Section>
        <Section onClick={navigateBoardDetailView}>
          <UserBoardImg src={img_photo} alt="" />
          <UserBoardContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </UserBoardContainer>
        </Section>
        <Section onClick={navigateBoardDetailView}>
          <UserBoardImg src={img_photo} alt="" />
          <UserBoardContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </UserBoardContainer>
        </Section>
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

const UserBoardImg = styled.img`
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
