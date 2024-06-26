import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ico_close from "../../../images/ico_close.png";
import { signUp } from "../../../api/SignUpApi";

const SignUpModal = (props) => {
  const [userData, setUserData] = useState({
    userId: "",
    userPw: "",
    birth: "",
    confirmPassword: "",
  });
  const { isSignUpModal, onClickCloseButton, setIsSignUpModal } = props;

  useEffect(() => {
    if (isSignUpModal) {
      setUserData({
        userId: "",
        userPw: "",
        birth: "",
        confirmPassword: "",
      });
    }
  }, [isSignUpModal]);

  const onChangeSignUpHandler = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const { userId, birth, userPw, confirmPassword } = userData;
  const passwordCheck = userPw === confirmPassword;

  const handleSignUpButton = async () => {
    try {
      if (
        userId !== "" &&
        birth !== "" &&
        userPw !== "" &&
        passwordCheck === true
      ) {
        const userDataForApi = {
          userId: userId,
          userPw: userPw,
          birth: birth,
        };

        const res = await signUp(userDataForApi);

        console.log(res.data);
        if (res.code === 200) {
          alert("가입이 완료되었습니다.");
          setIsSignUpModal(false);
        } else if (res.code === 500) {
          alert("중복된 이름입니다.");
        }
      } else if (userId !== "" && birth !== "" && passwordCheck === false) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        alert("작성을 완료해주세요.");
      }
    } catch (error) {
      console.error("가입에 실패했습니다:", error);
      alert("가입에 실패했습니다.");
    }
  };

  return (
    <SignUpModalWrap isSignUpModal={isSignUpModal}>
      <ModalCloseButton
        src={ico_close}
        alt="닫기"
        isSignUpModal={isSignUpModal}
        onClick={onClickCloseButton}
      />
      <SignUpInputWrap>
        {/* TODO USE MAP FUNCTION */}
        <div>
          <label htmlFor="username">
            사용할 이름을 입력해주세요 <span>*</span>
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            placeholder="Username"
            value={userId}
            onChange={onChangeSignUpHandler}
          ></input>
        </div>
        <div>
          <label htmlFor="birth">
            생년월일을 입력해주세요(6자리) <span>*</span>
          </label>
          <input
            type="number"
            id="birth"
            name="birth"
            placeholder="Birth Date"
            value={birth}
            onChange={onChangeSignUpHandler}
          ></input>
        </div>
        <div>
          <label htmlFor="userPw">
            비밀번호를 입력해주세요 <span>*</span>
          </label>
          <input
            type="password"
            id="loginUserPw"
            name="userPw"
            placeholder="Password"
            value={userPw}
            onChange={onChangeSignUpHandler}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">
            한번 더 입력해주세요 <span>*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Password"
            value={confirmPassword}
            onChange={onChangeSignUpHandler}
          ></input>
        </div>
      </SignUpInputWrap>
      <SignUpButtoncontents>
        <button type="submit" onClick={handleSignUpButton}>
          가입 완료
        </button>
      </SignUpButtoncontents>
    </SignUpModalWrap>
  );
};

export default SignUpModal;

const SignUpModalWrap = styled.div`
  display: ${(props) => (props.isSignUpModal ? "block" : "none")};
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

  transition: 0.3s;
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

const SignUpInputWrap = styled.article`
  display: flex;
  flex-direction: column;

  gap: 16px;
  margin: 96px 100px 10px;

  label {
    span {
      color: red;
    }
  }
  input {
    box-sizing: border-box;
    border-bottom: 1px solid #bed9e3;

    margin: 14px 0;
    padding: 6px;

    width: 100%;

    &:focus {
      outline: none;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
    }
  }
`;

const SignUpButtoncontents = styled.section`
  display: flex;
  justify-content: center;

  gap: 20px;
  margin: 36px 100px 0;

  button {
    padding: 10px;
    width: 100%;

    background-color: #ffc338;
    box-shadow:
      inset 0px -2px 8px rgba(0, 0, 0, 0.1),
      2px 3px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    color: #fff;
    font-weight: bold;
    font-size: 18px;

    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: #ffc339;
    }
  }
`;
