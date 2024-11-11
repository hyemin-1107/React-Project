import axiosInstance, {
  errorMessageHandle,
  requestFailedMessageHandle,
} from "../axios/axiosInstance";
import { pwChangeObject, signInObject } from "../utills/message";

export const signUpApi = async (userData) => {
  try {
    const res = await axiosInstance.post("/user/signup", userData);
    return res.data;
  } catch (error) {
    console.error("가입에 실패했습니다.", error);
  }
};

export const signInApi = async (userData, signInSuccessHandle) => {
  const { signInCode401, signInCode500, signInCatchError } = signInObject;

  try {
    const res = await axiosInstance.post("/user/", userData);

    if (res.code === 200) {
      signInSuccessHandle(res.data);
    } else if (res.data.code === 401) {
      alert(signInCode401);
    } else if (res.data.code === 500) {
      alert(signInCode500);
    }
  } catch (error) {
    errorMessageHandle(signInCatchError, error);
    alert(signInCatchError);
  }
};

export const pwChangeUpdateApi = async (passwordData, successHandle) => {
  const { pwChangeError, pwChangeCatchError } = pwChangeObject;

  try {
    const response = await axiosInstance.post("/user/", passwordData);

    if (response.data.code === 200) {
      successHandle(response.data);
      alert();
    } else {
      requestFailedMessageHandle(pwChangeError, response.data.message);
    }
  } catch (error) {
    errorMessageHandle(pwChangeCatchError, error);
  }
};
