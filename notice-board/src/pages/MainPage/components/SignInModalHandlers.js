import { signIn } from "../../../api/SignInApi";
import { signInObject } from "../../../utills/message";

const { signInSuccess, code401, code500, error, catchError } = signInObject;

export const onChangeSignInHandler = (e, setUserData) => {
  const { name, value } = e.target;
  setUserData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export const onClickLoginButton = async (
  e,
  userData,
  setIsLoggedIn,
  navigate,
) => {
  e.preventDefault();
  if (!userData.userId || !userData.userPw) {
    alert("아이디와 비밀번호를 입력하세요.");
    return;
  }
  //   console.log("로그인 요청 전:", userData);
  try {
    const res = await signIn(userData);
    // console.log("로그인 응답:", res);
    if (res) {
      if (res.code === 200) {
        alert(signInSuccess);
        localStorage.setItem("userId", userData.userId);
        setIsLoggedIn(true);
        navigate("/notice-board");
      } else if (res.code === 401) {
        alert(code401);
      } else if (res.code === 500) {
        alert(code500);
      }
    } else {
      //   console.error("로그인에 실패했습니다. 서버 응답이 없습니다.");
      alert(error);
    }
  } catch (error) {
    // console.error("에러가 발생했습니다:", error);
    alert(catchError);
  }
};
