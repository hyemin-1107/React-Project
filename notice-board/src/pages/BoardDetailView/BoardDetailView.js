import React, { useState } from "react";
import styled from "styled-components";
import img_photo from "../../images/img_photo.jpg";
import ico_close from "../../images/ico_close.png";

const BoardDetailView = (props) => {
  const [inputComment, setInputComment] = useState("");
  const { isBoardDetailModal, onClickCloseButton } = props;

  const InputComment = (e) => {
    const { value } = e.target;

    setInputComment(value);
  };
  return (
    <Wrap isBoardDetailModal={isBoardDetailModal}>
      <BoardDetailViewContainer>
        <BoardDetailViewWrap>
          <BoardDetailViewHeader>
            <h2>제목</h2>
          </BoardDetailViewHeader>
          <CloseButton src={ico_close} alt="" onClick={onClickCloseButton} />
          <BoardDetailViewUserDate>
            <div>작성자</div>
            <div>날짜</div>
          </BoardDetailViewUserDate>
          <BoardImg src={img_photo} alt="" />
          <p>dd</p>
          <CommentContainer>
            <input
              onChange={InputComment}
              value={inputComment}
              placeholder="Add a comment..."
            />
            <button>POST</button>
          </CommentContainer>
        </BoardDetailViewWrap>
      </BoardDetailViewContainer>
    </Wrap>
  );
};

export default BoardDetailView;

const Wrap = styled.div`
  display: ${(props) => (props.isBoardDetailModal ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
`;

const BoardDetailViewHeader = styled.header`
  position: fixed;
  height: 50px;
  width: 93%;
  background-color: #fff;
  padding-bottom: 5px;
  h2 {
    margin-left: 16px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
`;
const BoardDetailViewContainer = styled.section`
  position: fixed;
  top: 52%;
  left: 50%;
  z-index: 1;

  width: 805px;

  background: #fff;
  border-radius: 24px;
  padding: 30px 20px;

  box-shadow:
    rgba(14, 30, 37, 0.1) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.2) 0px 2px 16px 0px;
  box-sizing: border-box;

  transform: translate(-50%, -50%);
  animation: modal 0.5s ease;
  @keyframes modal {
    from {
      transform: translate(-50%, -62%);
    }
    to {
      transform: translate(-50%, -50%);
    }
  }
`;

const BoardDetailViewWrap = styled.div`
  max-height: 730px;
  overflow-y: auto;
  p {
    margin: 20px 6px;
    word-break: break-all;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bed9e3;
  }
`;

const BoardImg = styled.img`
  height: 350px;
  margin: 10px 16px;
`;

const CloseButton = styled.img`
  position: absolute;
  right: 0;
  top: 0;

  margin: 19px 24px;
  padding: 20px;
  width: 22px;

  cursor: pointer;

  &:hover {
    animation: close 0.3s ease;

    @keyframes close {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(90deg);
      }
    }
  }
`;

const BoardDetailViewUserDate = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 62px 30px 0px 16px;
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

    width: 83%;

    &:focus {
      outline: none;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
    }
  }
  button {
    margin-left: 22px;
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
