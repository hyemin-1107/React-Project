export const signUpObject = {
  signUpSuccess: "가입이 완료되었습니다.",
  code500: "중복된 이름입니다.",
  pwMismatch: "비밀번호가 일치하지 않습니다.",
  error: "작성을 완료해주세요.",
  catchError: "가입에 실패했습니다.",
};

export const signInObject = {
  signInSuccess: "로그인 성공!",
  code401: "아이디 또는 비밀번호가 잘못되었습니다.",
  code500: "서버에 에러가 발생했습니다.",
  error: "로그인에 실패했습니다. 서버 응답이 없습니다.",
  catchError: "에러가 발생했습니다.",
};

export const pwChangeObject = {
  success: "비밀번호가 성공적으로 변경되었습니다.",
  error: "비밀번호 변경 중 오류가 발생하였습니다.",
  catchError:
    "비밀번호 변경 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
};

export const createBoardObject = {
  success: "작성이 완료되었습니다.",
  error: "게시물 작성에 실패했습니다.",
  fillInValues: "모든 필드를 입력하고 이미지를 첨부해주세요.",
  catchError: "게시물 작성에 실패했습니다.",
};

export const noticeBoardObject = {
  fetchBoardError:
    "게시판 목록을 가져오는 도중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
  boardDetailError: "게시판 상세 정보를 가져오는데 실패했습니다.",
};

export const commentObject = {
  updatedCommentsError: "댓글 목록 갱신에 실패했습니다.",
  editingCommentError: "댓글 수정에 실패했습니다.",
  deleteCommentError: "댓글 삭제에 실패했습니다.",
  postCommentError: "댓글 작성에 실패했습니다.",
};
