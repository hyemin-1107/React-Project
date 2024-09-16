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

  const handleUnload = () => {
    // 탭이 닫힐 때만 로그아웃 처리
    if (!sessionStorage.getItem("isSessionActive")) {
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    sessionStorage.setItem("isSessionActive", "true");

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
