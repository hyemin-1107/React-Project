import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ico_close from "../../../images/ico_close.png";
import {
  onChangeSignInHandler,
  onClickLoginButton,
} from "./SignInModalHandlers";

const SignInModal = (props) => {
  const [userData, setUserData] = useState({
    userId: "",
    userPw: "",
  });

  const { isSignInModal, setIsSignInModal, openSignUpModal, setIsLoggedIn } =
    props;
  const navigate = useNavigate();

  return (
    <SignInModalWrap isSignInModal={isSignInModal}>
      <ModalCloseButton
        onClick={() => setIsSignInModal(false)}
        src={ico_close}
        alt="닫기"
      />
      <LoginWrap>
        <LoginTitle>Sign In</LoginTitle>
        <form
          onSubmit={(e) =>
            onClickLoginButton(e, userData, setIsLoggedIn, navigate)
          }
        >
          <LoginInputWrap>
            {SIGN_IN_INPUT.map((input) => (
              <LoginInput
                key={input.name}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                value={userData[input.name]}
                onChange={(e) => onChangeSignInHandler(e, setUserData)}
              />
            ))}
          </LoginInputWrap>
          <LoginSignInButton type="submit">Sign In</LoginSignInButton>
        </form>
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
  margin-top: 10px;
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
  padding: 5px 14px;

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
    background-color: #ffc335;
  }
`;

const SIGN_IN_INPUT = [
  {
    type: "text",
    name: "userId",
    placeholder: "Username",
  },
  {
    type: "password",
    name: "userPw",
    placeholder: "Password",
  },
];
