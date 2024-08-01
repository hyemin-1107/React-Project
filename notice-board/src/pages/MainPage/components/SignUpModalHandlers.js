import { signUp } from "../../../api/SignUpApi";
import { signUpObject } from "../../../utills/message";

const { signUpSuccess, code500, pwMismatch, error, catchError } = signUpObject;

export const onChangeSignUpHandler = (e, setUserData) => {
  const { name, value } = e.target;
  setUserData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const onClickSignUpButton = async (userData, setIsSignUpModal) => {
  const { userId, birth, userPw, confirmPassword } = userData;
  const passwordCheck = userPw === confirmPassword;

  try {
    if (
      userId !== "" &&
      birth !== "" &&
      userPw !== "" &&
      passwordCheck === true
    ) {
      const userDataForApi = { userId, userPw, birth };
      const res = await signUp(userDataForApi);
      //   console.log(res.data);
      if (res.code === 200) {
        alert(signUpSuccess);
        setIsSignUpModal(false);
      } else if (res.code === 500) {
        alert(code500);
      }
    } else if (userId !== "" && birth !== "" && passwordCheck === false) {
      alert(pwMismatch);
    } else {
      alert(error);
    }
  } catch (error) {
    // console.error("가입에 실패했습니다:", error);
    alert(catchError);
  }
};
