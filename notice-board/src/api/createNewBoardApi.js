import axiosInstance, {
  errorMessageHandle,
  requestFailedMessageHandle,
} from "../axios/axiosInstance";
import { createBoardObject } from "../utills/message";

export const createNewBoardApi = async (formUserData, successHandle) => {
  const { createBoardFillInValues, createBoardCatchError } = createBoardObject;
  try {
    const response = await axiosInstance.post("/board/", formUserData);
    if (response.data.code === 200) {
      successHandle(response.data);
    } else {
      requestFailedMessageHandle(createBoardFillInValues);
    }
  } catch (error) {
    errorMessageHandle(createBoardCatchError, error.message);
  }
};
