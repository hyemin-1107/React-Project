import React from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { userId } from "../../../recoil/state";

const CommentList = (props) => {
  const {
    comments,
    editingCommentId,
    editingContent,
    handleEditComment,
    handleUpdateComment,
    handleDeleteComment,
    setEditingCommentId,
    setEditingContent,
  } = props;

  const dischargeUserId = useSetRecoilState(userId);

  return (
    <CommentListContainer>
      {comments.map((data) => (
        <CommentItem key={data.commentId}>
          {editingCommentId === data.commentId ? (
            <>
              <input
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              {/* <button onClick={handleUpdateComment}>Update</button>
              <button onClick={() => setEditingCommentId(null)}>Cancel</button> */}
            </>
          ) : (
            <>
              <CommentUserId>{data.userId}</CommentUserId>
              <CommentDate>
                {new Date(data.createAt).toLocaleString()}
              </CommentDate>
              <Comment>{data.comment}</Comment>

              {data.userId === dischargeUserId && (
                <>
                  <button
                    onClick={() =>
                      handleEditComment(data.commentId, data.comment)
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteComment(data.commentId)}>
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </CommentItem>
      ))}
    </CommentListContainer>
  );
};

export default CommentList;

const CommentListContainer = styled.div`
  margin-top: 20px;
`;

const CommentItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 10px 0;

  button {
    margin-top: 10px;
    margin-right: 10px;
  }
`;

const CommentUserId = styled.span`
  margin: 0 10px;

  font-weight: 500;
  font-size: 14px;
`;
const CommentDate = styled.span`
  font-weight: 500;
  font-size: 14px;
`;

const Comment = styled.div`
  margin: 0 10px;
  padding-top: 2px;
`;
