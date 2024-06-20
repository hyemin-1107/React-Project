import axiosInstance from "../axios/axiosInstance";

export const fetchBoardList = async (page) => {
  try {
    const response = await axiosInstance.get(
      `/board/list?page=${page}&limit=10`,
    );
    console.log("Response from server:", response);
    console.log("Response data from server:", response.data);
    if (response.status === 200) {
      if (response.data.result === "success") {
        return {
          boardList: response.data.data,
          totalPages: response.data.totalPages,
        };
      } else {
        console.error("Server returned failure result:", response.data.message);
      }
    } else {
      console.error("Unexpected status code:", response.status);
    }
  } catch (error) {
    console.error("Failed to fetch board list:", error.message);
  }
};
