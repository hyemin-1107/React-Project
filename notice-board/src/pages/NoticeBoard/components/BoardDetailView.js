import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  // fetchBoardDetail,
  fetchCommentsApi,
  postCommentApi,
  updateCommentApi,
  deleteCommentApi,
  deleteBoardApi,
} from "../../../api/noticeBoardApi";
import ico_close from "../../../images/ico_close.png";
import CommentList from "./CommentList";
import { commentObject } from "../../../utills/message";
import { useRecoilValue } from "recoil";
import { authToken, userId } from "../../../recoil/state";

const BoardDetailView = (props) => {
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const {
    isBoardDetailModal,
    onClickCloseButton,
    selectedBoard,
    fetchAllBoardList,
  } = props;

  const setDischargeAuthToken = useRecoilValue(authToken);
  const setDischargeUserId = useRecoilValue(userId);

  const updateCommentCallBackFunction = () => {
    if (isBoardDetailModal && selectedBoard) {
      updateCommentsList(selectedBoard.boardId);
    }
  };

  useEffect(() => {
    updateCommentCallBackFunction();
    console.log("Selected Board:", selectedBoard);
  }, [isBoardDetailModal, selectedBoard]);

  const {
    updatedCommentsError,
    editingCommentError,
    deleteCommentError,
    postCommentError,
  } = commentObject;

  const updateCommentsList = async (boardId, authToken) => {
    try {
      const updatedComments = await fetchCommentsApi(
        boardId,
        setDischargeAuthToken,
      );
      setComments(updatedComments);
      console.log("Updated Comments", updatedComments);
    } catch (error) {
      // console.error("댓글 목록 갱신에 실패했습니다.", error);
      alert(updatedCommentsError);
    }
  };

  const handleUpdateComment = async () => {
    if (editingCommentId) {
      try {
        await updateCommentApi(editingCommentId, editingContent);
        await updateCommentsList(selectedBoard.boardId); // 댓글 목록을 다시 불러오기
        setEditingCommentId(null); // 수정 모드 종료
        setEditingContent("");
      } catch (error) {
        alert(editingCommentError);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentApi(commentId);
      await updateCommentsList(selectedBoard.boardId);
    } catch (error) {
      // console.error("댓글 삭제에 실패했습니다.", error);
      alert(deleteCommentError);
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handlePostComment = async () => {
    try {
      const response = await postCommentApi(
        selectedBoard.boardId,
        inputComment,
        setDischargeAuthToken,
      );
      if (response) {
        await updateCommentsList(selectedBoard.boardId); // 댓글 목록 갱신
        setInputComment("");
      } else {
        console.error("댓글 작성에 실패했습니다.");
        alert("댓글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 작성에 실패했습니다 error", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteBoard = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await deleteBoardApi(selectedBoard.boardId, setDischargeAuthToken);
        alert("게시글이 삭제되었습니다.");
        onClickCloseButton();
        fetchAllBoardList();
      } catch (error) {
        console.log("게시글 삭제에 실패했습니다.", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const InputComment = (e) => {
    setInputComment(e.target.value);
  };

  if (!selectedBoard) {
    return null; // selectedBoard가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <Wrap isBoardDetailModal={isBoardDetailModal}>
      <BoardDetailViewContainer>
        <BoardDetailViewWrap>
          <BoardDetailViewHeader>
            <h2>{selectedBoard.boardTitle}</h2>
          </BoardDetailViewHeader>
          <CloseButton src={ico_close} alt="" onClick={onClickCloseButton} />
          <BoardDetailViewUserDate>
            <div>{selectedBoard.userId}</div>
            {selectedBoard.userId === setDischargeUserId && (
              <DeleteButton
                onClick={() => handleDeleteBoard(fetchAllBoardList)}
              >
                게시글 삭제
              </DeleteButton>
            )}
            <div>{new Date(selectedBoard.createAt).toLocaleDateString()}</div>
          </BoardDetailViewUserDate>
          <BoardImg src={selectedBoard.src} alt="게시글 이미지" />
          <p>{selectedBoard.boardDetail}</p>

          <CommentContainer>
            <input
              onChange={InputComment}
              value={inputComment}
              placeholder="Add a comment..."
            />
            <button onClick={handlePostComment}>POST</button>
          </CommentContainer>
          <CommentList
            comments={comments}
            authToken={authToken}
            editingCommentId={editingCommentId}
            editingContent={editingContent}
            handleEditComment={handleEditComment}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
            setEditingCommentId={setEditingCommentId}
            setEditingContent={setEditingContent}
          />
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

  top: 28px;
  padding-bottom: 5px;

  height: 50px;
  width: 93%;

  background-color: #fff;
  h2 {
    margin-left: 16px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
`;

const DeleteButton = styled.button`
  margin-left: 500px;
  padding: 6px;

  color: white;
  border: 1px solid #666;
  background-color: #66bacf;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3a809b;
  }
`;

const BoardDetailViewContainer = styled.section`
  position: fixed;
  top: 52%;
  left: 50%;
  z-index: 1;

  padding: 30px 20px;

  width: 805px;

  background: #fff;
  border-radius: 24px;
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
  margin: 10px 16px;
  height: 350px;
`;

const CloseButton = styled.img`
  position: absolute;
  right: 0;
  top: 0;

  margin: 19px 20px;
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
  align-items: center;

  margin: 62px 30px 0px 16px;
`;

const CommentContainer = styled.div`
  margin: 40px 0 6px 0;
  padding-top: 10px;

  border-top: 2px solid rgba(0, 0, 0, 0.1);
  input {
    margin: 20px;
    padding: 6px;

    width: 80%;

    box-sizing: border-box;
    border-bottom: 1px solid #bed9e3;
    &:focus {
      outline: none;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
    }
  }
  button {
    /* margin-left: 22px; */
    padding: 6px 20px;

    font-weight: bold;
    font-size: 16px;

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
