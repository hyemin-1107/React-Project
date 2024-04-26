import React, { useState } from "react";
import styled from "styled-components";
import ico_close from "../../../images/ico_close.png";
import ico_important from "../../../images/ico_important.png";

const SignUpModal = (props) => {
  // 유저네임, 생년월일, 비번, 비번확인 상태값
  const [userData, setUserData] = useState({
    username: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const { isSignUpModal, onClickCloseButton, setIsSignUpModal } = props;

  // input창에 입력할때 해당 값 변화를 감지하고 업데이트
  const onChangeUsernameHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const { username, birthDate, password, confirmPassword } = userData;

  // 비밀번호 일치 체크
  const passwordCheck = password === confirmPassword;

  // 모든 값 입력 완료 체크
  const inputCompleteButton = () => {
    if (username !== "" && birthDate !== "" && passwordCheck === true) {
      alert("가입이 완료되었습니다.");
      setIsSignUpModal(false);
    } else if (username !== "" && birthDate !== "" && passwordCheck === false) {
      alert("비밀번호가 일치 하지않습니다.");
    } else {
      alert("작성을 완료해주세요");
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
        <div>
          <label htmlFor="username">
            사용할 이름을 입력해주세요 <span>*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          ></input>
        </div>
        <div>
          <label htmlFor="birthDate">
            생년월일을 입력해주세요(6자리) <span>*</span>
          </label>
          <input
            type="number"
            id="birthDate"
            name="birthDate"
            placeholder="Birth Date"
            value={birthDate}
            onChange={(e) =>
              setUserData({ ...userData, birthDate: e.target.value })
            }
          ></input>
        </div>
        <div>
          <label htmlFor="password">
            비밀번호를 입력해주세요 <span>*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
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
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
          ></input>
        </div>
      </SignUpInputWrap>
      <Agreement>
        <input type="checkbox" id="checkbox" />
        <label label for="checkbox">
          개인정보 수집 및 이용에 동의합니다.
        </label>
      </Agreement>
      <SignUpButtoncontents>
        <button onClick={inputCompleteButton}>가입 완료</button>
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

  background: #fefefe;

  box-shadow:
    inset 0px -12px 26px rgba(0, 0, 0, 0.1),
    inset 0px 1px 5px rgba(255, 255, 255, 0.4),
    2px 3px 10px rgba(0, 0, 0, 0.2);
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
  margin: 80px 100px 10px;
  /* label{
    position: relative;
    &:after{
        content: '';
        position: absolute;
        display: inline-block;
        top: 5px;
        right: -18px;
    width: 13px;
    height: 13px;
    background: url(${ico_important})no-repeat;
    background-size: 100%;
   }
} */
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

const Agreement = styled.span`
  display: flex;

  gap: 10px;
  margin: 0 100px;

  input {
    /* display: none; */
    &:checked + label {
      font-style: italic;
    }
    cursor: pointer;
  }
  label {
    cursor: pointer;
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

    background-color: #ffcc56;
    box-shadow:
      inset 0px -2px 10px rgba(0, 0, 0, 0.1),
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
