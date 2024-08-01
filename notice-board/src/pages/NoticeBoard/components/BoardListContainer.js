import React from "react";
import styled from "styled-components";

const BoardListContainer = (props) => {
  const { boardList, openBoardDetailModal, formattedDate } = props;

  return (
    <Container>
      {boardList && (
        <BoardContainer>
          {boardList.map((board) => (
            <Section
              key={board.boardId}
              onClick={() => openBoardDetailModal(board.boardId)}
            >
              <BoardImg src={board.src} alt="첨부이미지" />
              <UserBoardContainer>
                <h2>{board.boardTitle}</h2>
                <p>{board.userId}</p>
                <span>
                  {formattedDate(board.createAt).toLocaleDateString()}
                </span>
              </UserBoardContainer>
            </Section>
          ))}
        </BoardContainer>
      )}
    </Container>
  );
};

export default BoardListContainer;

const Container = styled.div`
  margin-bottom: 20px;
  height: 77dvh;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
`;

const Section = styled.section`
  width: 30%;
  margin-bottom: 20px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const BoardImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const UserBoardContainer = styled.div`
  padding: 10px;
  h2 {
    margin: 0;
    font-size: 1.5em;
  }
  p {
    margin: 0.5em 0;
  }
  span {
    font-size: 0.9em;
    color: #555;
  }
`;
