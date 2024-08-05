import React from "react";
import styled from "styled-components";

const BoardListContainer = (props) => {
  const { boardList, openBoardDetailModal, formattedDate } = props;

  return (
    <BoardContainer>
      {boardList && boardList.length > 0 ? (
        boardList.map((board) => (
          <Section
            key={board.boardId}
            onClick={() => openBoardDetailModal(board.boardId)}
          >
            <BoardImg src={board.src} alt="첨부이미지" />
            <UserBoardContainer>
              <h2>{board.boardTitle}</h2>
              <p>{board.userId}</p>
              <span>{formattedDate(board.createAt).toLocaleDateString()}</span>
            </UserBoardContainer>
          </Section>
        ))
      ) : (
        <div>No boards available</div>
      )}
    </BoardContainer>
  );
};

export default BoardListContainer;

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-top: 20px;

  height: 80vh;
`;

const Section = styled.section`
  margin-bottom: 20px;

  width: 32%;

  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const BoardImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const UserBoardContainer = styled.div`
  padding: 10px 16px;
  border-top: 1px solid #ddd;
  h2 {
  }
  p {
    margin: 5px 0;
  }
  span {
    display: inline-block;
    margin-top: 12px;
    font-size: 14px;
    color: #555;
  }
`;
