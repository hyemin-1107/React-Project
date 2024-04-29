import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderContents from "../../components/HeaderContents";
import styled from "styled-components";
import img_photo from "../../images/img_photo.jpg";

const NoticeBoard = () => {
  const navigate = useNavigate();
  const navigateToCreateBoard = () => {
    navigate("/create-board");
  };
  return (
    <>
      <HeaderContents />
      <BoardContainer>
        <Section>
          <DataImg src={img_photo} alt="첨부이미지" />
          <DataContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </DataContainer>
        </Section>
        <Section>
          <DataImg src={img_photo} alt="" />
          <DataContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </DataContainer>
        </Section>
        <Section>
          <DataImg src={img_photo} alt="" />
          <DataContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </DataContainer>
        </Section>
        <Section>
          <DataImg src={img_photo} alt="" />
          <DataContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </DataContainer>
        </Section>
        <Section>
          <DataImg src={img_photo} alt="" />
          <DataContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </DataContainer>
        </Section>
        <Section>
          <DataImg src={img_photo} alt="" />
          <DataContainer>
            <h2>제목</h2>
            <p>작성자</p>
          </DataContainer>
        </Section>
      </BoardContainer>
      <CreateButtonWrap>
        <button onClick={navigateToCreateBoard}> 게시물 올리기</button>
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
    inset 0px -2px 10px rgba(0, 0, 0, 0.1),
    2px 3px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  cursor: pointer;

  &:hover {
    border: none;
  }
`;

const DataImg = styled.img`
  width: 100%;
  height: 65%;

  border-radius: 6px;
  object-fit: cover;
`;

const DataContainer = styled.div`
  margin-top: 10px;

  h2 {
  }
  p {
    margin-top: 26px;
    color: #666;
  }
`;

const CreateButtonWrap = styled.section`
  display: flex;
  justify-content: end;

  margin: 0 auto;

  width: 900px;

  button {
    margin-top: 3px;
    padding: 10px 20px;

    color: #fff;
    background-color: #ffc338;

    box-shadow:
      inset 0px 1px 5px rgba(0, 0, 0, 0.05),
      2px 3px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    font-weight: 500;
    font-size: 17px;

    cursor: pointer;
    transition: 0.2s;

    &:hover {
    }
  }
`;
