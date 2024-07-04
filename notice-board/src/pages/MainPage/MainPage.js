import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { onClickModal } from "../../utills/onClickModal";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import ico_sun from "../../images/ico_sun.png";
import ico_comment from "../../images/ico_comment.png";
import ico_plane from "../../images/ico_plane.png";
import ico_close from "../../images/ico_close.png";
import HeaderContents from "../../components/HeaderContents";
// import axiosInstance from "../../services/axiosInstance";
import { changePassword } from "../../api/PasswordChangeApi";

const MainPage = () => {
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);
  const [isProfileUpdateModal, setIsProfileUpdateModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordData, setPasswordData] = useState({
    userId: "",
    userPw: "",
    newUserPw: "",
    confirmUserPw: "",
  });

  const openSignUpModal = () => {
    setIsSignUpModal(true);
    setIsSignInModal(false);
  };

  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 토큰을 확인하여 로그인 상태를 설정
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    setIsLoggedIn(false);
  };

  const handleChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordChange = async () => {
    try {
      const res = await changePassword({
        userId: passwordData.userId,
        userPw: passwordData.userPw,
        newUserPw: passwordData.newUserPw,
        confirmUserPw: passwordData.confirmUserPw,
      });
      console.log(res);
      if (res.code === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setIsProfileUpdateModal(false);
      } else {
        alert("비밀번호 변경 중 오류가 발생하였습니다.");
      }
    } catch (error) {
      alert("비밀번호 변경 중 오류가 발생하였습니다: " + error.message);
    }
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
        {isLoggedIn ? (
          <LoginButtonWrap>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <LogoutButton
              onClick={() =>
                onClickModal(isProfileUpdateModal, setIsProfileUpdateModal)
              }
            >
              내 정보 수정
            </LogoutButton>
          </LoginButtonWrap>
        ) : (
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
        )}
        <ProfileUpdateModal isProfileUpdate={isProfileUpdateModal}>
          <ModalCloseButton
            onClick={() =>
              onClickModal(isProfileUpdateModal, setIsProfileUpdateModal)
            }
            src={ico_close}
            alt="닫기"
          />
          <ProfileUpdateWrap>
            <h2>비밀번호 변경</h2>
            <div>
              <label htmlFor="userPw">
                기존 비밀번호를 입력해주세요.<span>*</span>
              </label>
              <input
                type="password"
                id="userPw"
                name="userPw"
                placeholder="password"
                value={passwordData.userPw}
                onChange={handleChangePasswordInput}
              ></input>
            </div>
            <div>
              <label htmlFor="newUserPw">
                새로운 비밀번호를 입력해주세요.<span>*</span>
              </label>
              <input
                type="password"
                id="newUserPw"
                name="newUserPw"
                placeholder="new password"
                value={passwordData.newUserPw}
                onChange={handleChangePasswordInput}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmUserPw">
                한번 더 입력해주세요.<span>*</span>
              </label>
              <input
                type="password"
                id="confirmUserPw"
                name="confirmUserPw"
                placeholder="new password"
                value={passwordData.confirmUserPw}
                onChange={handleChangePasswordInput}
              ></input>
            </div>
            <button onClick={handlePasswordChange}>확 인</button>
          </ProfileUpdateWrap>
        </ProfileUpdateModal>
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
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
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

const LogoutButton = styled.button`
  padding: 10px 25px;

  background-color: rgba(0, 0, 0, 0.4);
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
    background-color: #666;
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const ProfileUpdateModal = styled.div`
  display: ${(props) => (props.isProfileUpdate ? "block" : "none")};

  position: fixed;

  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);

  width: 500px;
  height: 550px;

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

const ProfileUpdateWrap = styled.section`
  margin: 100px 50px 0 50px;

  text-align: center;

  h2 {
    margin-bottom: 60px;
  }
  div {
    display: flex;
    justify-content: space-between;

    margin: 40px auto;

    width: 400px;
  }
  label {
    font-size: 14px;
    span {
      color: red;
    }
  }
  input {
    padding: 0 3px;

    box-sizing: border-box;
    border-bottom: 1px solid #bed9e3;

    &:focus {
      outline: none;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
    }
  }
  button {
    margin-top: 24px;
    padding: 4px;

    width: 100%;

    background-color: rgba(0, 0, 0, 0.4);
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
      background-color: #666;
    }
    &:active {
      box-shadow: none;
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
