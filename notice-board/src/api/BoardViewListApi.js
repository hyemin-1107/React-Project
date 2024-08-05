// import { fetchBoardList } from "./BoardListApi";

// export const fetchBoard = async (
//   page,
//   paginationButton,
//   setBoardList,
//   setTotalPages,
// ) => {
//   const limit = paginationButton;
//   const offset = (page - 1) * paginationButton;
//   const userId = localStorage.getItem("userId");
//   try {
//     const response = await fetchBoardList(offset, limit, userId);
//     if (response.code === 200) {
//       setBoardList(response.boardList);
//       setTotalPages(response.totalPages);
//     }
//   } catch (error) {
//     console.error("게시판 리스트를 가져오는데 실패했습니다:", error.message);
//     alert(
//       "게시판 목록을 가져오는 도중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
//     );
//   }
// };
