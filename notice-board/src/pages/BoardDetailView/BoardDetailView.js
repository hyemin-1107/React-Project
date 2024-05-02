import React from "react";
import styled from "styled-components";
import img_photo from "../../images/img_photo.jpg";
import HeaderContents from "../../components/HeaderContents";

const BoardDetailView = () => {
  return (
    <>
      <HeaderContents />
      <BoardDetailViewContainer>
        <h2>제목</h2>
        <BoardDetailViewUserDate>
          <div>작성자</div>
          <div>날짜</div>
        </BoardDetailViewUserDate>
        <img src={img_photo} alt="" />
        <p>asdasd</p>
        <CommentContainer>
          <input placeholder="Add a comment..." />
          <button>POST</button>
        </CommentContainer>
      </BoardDetailViewContainer>
    </>
  );
};

export default BoardDetailView;

const BoardDetailViewContainer = styled.section`
  margin: 40px auto 80px;
  padding: 36px 36px 20px 36px;

  width: 800px;
  /* height: 700px; */

  background: #fff;
  border-radius: 24px;

  box-shadow:
    rgba(14, 30, 37, 0.1) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.2) 0px 2px 16px 0px;
  box-sizing: border-box;

  h2 {
    padding: 0 0 16px 6px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  img {
    height: 350px;
    margin: 10px 6px;
  }
  p {
    margin: 20px 6px;
  }
`;

const BoardDetailViewUserDate = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 10px 6px 0px 6px;
`;

const CommentContainer = styled.div`
  margin: 40px 0 6px 0;
  padding-top: 10px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  input {
    box-sizing: border-box;
    border-bottom: 1px solid #bed9e3;

    margin: 26px 0;
    padding: 6px;

    width: 85%;

    &:focus {
      outline: none;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
    }
  }
  button {
    margin-left: 20px;
    padding: 6px 20px;

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
  }
`;
