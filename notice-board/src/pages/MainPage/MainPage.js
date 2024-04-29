import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { onClickModal } from "../../utills/onClickModal";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import ico_sun from "../../images/ico_sun.png";
import ico_comment from "../../images/ico_comment.png";
import ico_plane from "../../images/ico_plane.png";
import HeaderContents from "../../components/HeaderContents";

const MainPage = () => {
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);
  const openSignUpModal = () => {
    setIsSignUpModal(true);
    setIsSignInModal(false);
  };
  return (
    <>
      <HeaderContents />
      <MainWrap>
        <LogoMain>
          <img src={ico_sun} alt="로고이미지" />
          <div>Daily Record</div>
        </LogoMain>
        <MainText>
          <div>자유롭게 게시물을 올리는 공간입니다</div>
          <div>
            나의 일상을
            <img src={ico_plane} alt="일상" />
            기록하고
          </div>
          <div>
            댓글로 의견을 나눠보세요 <img src={ico_comment} alt="의견나누기" />
          </div>
        </MainText>
        <LoginButtonWrap>
          <LoginButton
            onClick={() => onClickModal(isSignUpModal, setIsSignUpModal)}
          >
            Sign up
          </LoginButton>
          <LoginButton
            onClick={() => onClickModal(isSignInModal, setIsSignInModal)}
          >
            Sign in
          </LoginButton>
        </LoginButtonWrap>
        <SignUpModal
          isSignUpModal={isSignUpModal}
          setIsSignUpModal={setIsSignUpModal}
          onClickCloseButton={() =>
            onClickModal(isSignUpModal, setIsSignUpModal)
          }
        />
        <SignInModal
          isSignInModal={isSignInModal}
          onClickCloseButton={() =>
            onClickModal(isSignInModal, setIsSignInModal)
          }
          openSignUpModal={openSignUpModal}
        />
      </MainWrap>
    </>
  );
};

export default MainPage;

const MainWrap = styled.main`
  margin-top: 100px;
`;

const MainText = styled.section`
  font-size: 22px;
  font-weight: 500;
  line-height: 1.9;
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    margin: 0 6px;
    width: 28px;
  }
`;

const Logospin = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

const LogoMain = styled.h2`
  margin-bottom: 30px;

  font-style: normal;
  font-size: 52px;
  font-weight: 600;

  text-align: center;
  text-shadow:
    3px 4px 4px rgba(0, 0, 0, 0.2),
    6px 8px rgba(0, 0, 0, 0.1);

  div {
    color: #fff;
  }

  img {
    width: 90px;
    animation: ${Logospin} 22s linear infinite;
  }
`;

const LoginButtonWrap = styled.section`
  display: flex;
  justify-content: center;

  margin-top: 80px;
  gap: 46px;
`;

const LoginButton = styled.button`
  padding: 15px 45px;

  background-color: #ffc338;
  box-shadow:
    inset 0px -12px 26px rgba(0, 0, 0, 0.05),
    2px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 14px;

  color: #fff;
  font-weight: bold;
  font-size: 22px;

  border: 0;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #ffc338;
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;
