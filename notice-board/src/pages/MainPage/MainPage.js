import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import HeaderContents from "../../components/HeaderContents";
import ChangePasswordModal from "./components/ChangePasswordModal";
import MainContent from "./components/MainContent";

const MainPage = () => {
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);
  const [isProfileUpdateModal, setIsProfileUpdateModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openSignUpModal = () => {
    setIsSignUpModal(true);
    setIsSignInModal(false);
  };

  const signInAddToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    signInAddToken();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleUnload = (event) => {
    // 새로고침과 탭 닫기를 구분하기 위해 event.returnValue를 사용
    // 새로고침 시에는 sessionStorage에서 token을 삭제하지 않음
    if (!event.returnValue) {
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <>
      <HeaderContents />
      <MainWrap>
        <MainContent
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          isProfileUpdateModal={isProfileUpdateModal}
          setIsProfileUpdateModal={setIsProfileUpdateModal}
          isSignUpModal={isSignUpModal}
          setIsSignUpModal={setIsSignUpModal}
          isSignInModal={isSignInModal}
          setIsSignInModal={setIsSignInModal}
        />
        <ChangePasswordModal
          isProfileUpdateModal={isProfileUpdateModal}
          setIsProfileUpdateModal={setIsProfileUpdateModal}
        />
        <SignUpModal
          isSignUpModal={isSignUpModal}
          setIsSignUpModal={setIsSignUpModal}
        />
        <SignInModal
          isSignInModal={isSignInModal}
          setIsSignInModal={setIsSignInModal}
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
