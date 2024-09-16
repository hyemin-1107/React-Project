import React from "react";
import styled from "styled-components";

const CommentList = (props) => {
  const {
    comments,
    token,
    editingCommentId,
    editingContent,
    handleEditComment,
    handleUpdateComment,
    handleDeleteComment,
    setEditingCommentId,
    setEditingContent,
  } = props;

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
              <p>{data.content}</p>
              <span>{data.comment}</span>
              <span>{data.createAt}</span>
              {data.userId === token && (
                <>
                  <button
                    onClick={() =>
                      handleEditComment(data.commentId, data.content)
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
