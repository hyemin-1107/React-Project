import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import ico_close from "../../../images/ico_close.png";

const SignInModal = (props) => {
  const [userData, setUserData] = useState({
    userId: "",
    userPw: "",
  });
  const { isSignInModal, onClickCloseButton, openSignUpModal } = props;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    if (!userData.userId || !userData.userPw) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }
    // 요청 보내기 전에 userData 확인 데이터
    console.log("로그인 요청 전:", userData);
    axios.post("백엔드주소", userData).then((res) => {
      console.log("로그인 응답:", res.data);

      const { token } = res.data;
      localStorage.setItem("token", token);

      if (res.data.code === 200) {
        alert("로그인 성공!");
        navigate("/notice-board");
      } else if (res.data.code === 401) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      } else if (res.data.code === 500) {
        alert("서버에 에러가 발생했습니다.");
      } else {
        alert("서버에 에러가 발생했습니다.");
      }
    });
    // .catch((error) => {
    //   if (error.response) {
    //     //status HTTP상태코드
    //     if (error.response.code === 401) {
    //       alert("아이디 또는 비밀번호가 잘못되었습니다.");
    //     } else if (error.response.code === 500) {
    //       alert("서버에 에러가 발생했습니다.");
    //     } else {
    //       alert("서버에 에러가 발생했습니다.");
    //     }
    //   } else {
    //     alert("에러가 발생했습니다.");
    //   }
    // });
  };

  return (
    <SignInModalWrap isSignInModal={isSignInModal}>
      <ModalCloseButton
        onClick={onClickCloseButton}
        src={ico_close}
        alt="닫기"
      />
      <LoginWrap>
        <LoginTitle>Sign In</LoginTitle>
        <form>
          <LoginInputWrap>
            <LoginInput
              type="text"
              name="userId"
              placeholder="Username"
              value={userData.userId}
              onChange={handleInputChange}
            />
            <LoginInput
              type="password"
              name="userPw"
              placeholder="Password"
              value={userData.userPw}
              onChange={handleInputChange}
            />
          </LoginInputWrap>
        </form>
        <LoginSignInButton type="submit" onClick={handleLoginButton}>
          Sign In
        </LoginSignInButton>
        <LoginSignUp>
          <LoginSignUpText>회원이 아니신가요?</LoginSignUpText>
          <LoginSignUpButton onClick={openSignUpModal}>
            가입하기
          </LoginSignUpButton>
        </LoginSignUp>
      </LoginWrap>
    </SignInModalWrap>
  );
};

export default SignInModal;

const SignInModalWrap = styled.div`
  display: ${(props) => (props.isSignInModal ? "block" : "none")};

  position: fixed;

  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);

  width: 650px;
  height: 650px;

  background: #fff;
  box-shadow:
    rgba(14, 30, 37, 0.1) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.2) 0px 2px 16px 0px;

  border-radius: 24px;

  animation: modal 0.5s ease;
  @keyframes modal {
    from {
      transform: translate(-50%, -62%);
    }
    to {
      transform: translate(-50%, -50%);
    }
  }
`;

const ModalCloseButton = styled.img`
  position: absolute;
  right: 0;
  top: 0;

  margin: 33px;

  width: 22px;

  cursor: pointer;

  &:hover {
    animation: close 0.3s ease;

    @keyframes close {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(90deg);
      }
    }
  }
`;

const LoginWrap = styled.div`
  margin: 130px 180px;

  text-align: center;
`;

const LoginTitle = styled.h1`
  font-size: 36px;
  color: #66bacf;

  -webkit-text-stroke: 1px #666;
  text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
`;

const LoginInputWrap = styled.div`
  margin-top: 30px;
`;

const LoginInput = styled.input`
  box-sizing: border-box;
  border-bottom: 1px solid #bed9e3;

  margin: 16px 0;
  padding: 6px;

  width: 100%;

  &:focus {
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
  }
`;

const LoginSignInButton = styled.button`
  margin-top: 8px;
  padding: 4px;

  width: 100%;

  font-weight: 500;
  font-size: 18px;

  border-radius: 4px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px,
    rgba(0, 0, 0, 0.1) 0px 5px 5px;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #fff;
    background-color: #666;

    box-shadow:
      rgba(0, 0, 0, 0.2) 0px 1px 3px,
      rgba(0, 0, 0, 0.2) 0px 10px 10px;
  }
`;

const LoginSignUp = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 28px;
  gap: 16px;
`;

const LoginSignUpText = styled.section`
  font-size: 14px;
  font-style: italic;
`;

const LoginSignUpButton = styled.button`
  padding: 5px 12px;

  background-color: #ffc338;
  box-shadow:
    inset 0px -2px 3px rgba(0, 0, 0, 0.1),
    2px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  color: #fff;
  font-weight: bold;
  font-size: 14px;

  border: 0;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #ffc339;
  }
`;
