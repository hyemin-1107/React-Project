import React from "react";
import styled from "styled-components";

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

  const currentUserId = sessionStorage.getItem("userId");

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
              <button onClick={handleUpdateComment}>Update</button>
              <button onClick={() => setEditingCommentId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{data.comment}</span>
              <span>{new Date(data.createAt).toLocaleString()}</span>
              {data.boardId === currentUserId && (
                <>
                  <button
                    onClick={() =>
                      handleEditComment(data.boardId, data.comment)
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteComment(data.boardId)}>
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
  p {
    margin: 0;
  }
  small {
    display: block;
    margin-top: 5px;
    color: #999;
  }
  button {
    margin-top: 10px;
    margin-right: 10px;
  }
`;
