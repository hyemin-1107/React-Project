import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import HeaderContents from "../../components/HeaderContents";
import ChangePasswordModal from "./components/ChangePasswordModal";
import MainContent from "./components/MainContent";

import { useRecoilState } from "recoil";
import { authTokenState } from "../../utills/state";

const MainPage = () => {
  const [token, setToken] = useRecoilState(authTokenState);
  const [isSignUpModal, setIsSignUpModal] = useState(false);
  const [isSignInModal, setIsSignInModal] = useState(false);
  const [isProfileUpdateModal, setIsProfileUpdateModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("token"),
  );

  useEffect(() => {
    const checkLogin = () => {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  const openSignUpModal = () => {
    setIsSignUpModal(true);
    setIsSignInModal(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      <HeaderContents />
      <MainWrap>
        <MainContent
          isLoggedIn={!!token}
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
          setToken={setToken}
        />
      </MainWrap>
    </>
  );
};

export default MainPage;

const MainWrap = styled.main`
  margin-top: 100px;
`;
