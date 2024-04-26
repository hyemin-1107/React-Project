import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderContents from "../../components/HeaderContents";
import styled from "styled-components";

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
          <DataImg>asdad</DataImg>
          <DataTitle>asdasd</DataTitle>
        </Section>
        <Section>
          <DataImg>asdad</DataImg>
          <DataTitle>asdasd</DataTitle>
        </Section>
        <Section>
          <DataImg>asdad</DataImg>
          <DataTitle>asdasd</DataTitle>
        </Section>
        <Section>
          <DataImg>asdad</DataImg>
          <DataTitle>asdasd</DataTitle>
        </Section>
        <Section>
          <DataImg>asdad</DataImg>
          <DataTitle>asdasd</DataTitle>
        </Section>
        <Section>
          <DataImg>asdad</DataImg>
          <DataTitle>asdasd</DataTitle>
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

  margin: 20px auto;

  width: 900px;
  height: 679px;

  gap: 14px;

  /* margin: 20px 0; */
`;

const Section = styled.button`
  display: flex;
  align-items: center;

  gap: 20px;
  padding: 23px;

  height: 336px;

  background-color: #fff;
  border: 1px solid #444;
  border-radius: 6px;
  box-shadow:
    inset 0px -2px 10px rgba(0, 0, 0, 0.1),
    2px 3px 10px rgba(0, 0, 0, 0.1);

  cursor: pointer;
  /* transition: 0.3s; */

  &:hover {
    border: none;
    box-shadow:
      inset 0px -2px 10px rgba(0, 0, 0, 0.1),
      2px 3px 10px rgba(0, 0, 0, 0.2);
  }
`;

const DataImg = styled.h3`
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const DataTitle = styled.div`
  font-weight: bold;
`;

const CreateButtonWrap = styled.section`
  display: flex;
  justify-content: end;

  margin: 0 auto;

  width: 900px;

  button {
    padding: 10px 20px;

    background-color: #fff;
    box-shadow:
      inset 0px -2px 10px rgba(0, 0, 0, 0.1),
      2px 3px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    color: #444;
    font-weight: 500;
    font-size: 15px;

    cursor: pointer;
    transition: 0.2s;

    &:hover {
    }
  }
`;
