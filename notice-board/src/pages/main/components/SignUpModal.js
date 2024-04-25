import React, { useState } from "react";
import styled from "styled-components";
import ico_close from "../../../images/ico_close.png";
import ico_important from "../../../images/ico_important.png";

const SignUpModal = (props) => {
  const { isSignUpModal, onClickCloseButton } = props;

  // 유저네임, 비번, 비번확인 상태값
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // input창에 입력할때 해당 값 변화를 감지하고 업데이트
  const onChangeUsernameHandler = (e) => {
    const usernameValue = e.target.value;
    setUsername(usernameValue);
  };

  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else {
      setConfirmPassword(value);
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
          <label name="id">
            사용할 이름을 입력해주세요 <span>*</span>
          </label>
          <input name="id" placeholder="Username"></input>
        </div>
        <div>
          <label name="pw">
            비밀번호를 입력해주세요 <span>*</span>
          </label>
          <input type="password" name="pw" placeholder="Password"></input>
        </div>
        <div>
          <label name="pw">
            한번 더 입력해주세요 <span>*</span>
          </label>
          <input type="password" name="pw" placeholder="Password"></input>
        </div>
      </SignUpInputWrap>
      <Agreement>
        <input type="checkbox" id="checkbox" />
        <label label for="checkbox">
          개인정보 수집 및 이용에 동의합니다.
        </label>
      </Agreement>
      <SignUpButtoncontents>
        <button>가입 완료</button>
      </SignUpButtoncontents>
    </SignUpModalWrap>
  );
};

export default SignUpModal;

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

  width: 24px;

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

  gap: 30px;
  margin: 110px 100px 10px;
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

const SignUpButtoncontents = styled.section`
  display: flex;
  justify-content: center;

  gap: 20px;
  margin: 50px 100px;

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