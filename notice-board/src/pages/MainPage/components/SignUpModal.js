import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ico_close from "../../../images/ico_close.png";
import { signUpApi } from "../../../api/SignUpApi";
import { signUpObject } from "../../../utills/message";
import { onChangeUserDataHandler } from "../../../utills/onChangeUserData";

const SignUpModal = (props) => {
  const [userData, setUserData] = useState({
    userId: "",
    userPw: "",
    birth: "",
    confirmPassword: "",
  });
  const { isSignUpModal, setIsSignUpModal } = props;
  const {
    signUpSuccess,
    signUpCode500,
    signUpPwMismatch,
    signUpError,
    signUpCatchError,
  } = signUpObject;
  const onClickSignUpButton = async (userData, setIsSignUpModal) => {
    const { userId, birth, userPw, confirmPassword } = userData;
    const passwordCheck = userPw === confirmPassword;

    try {
      if (
        userId !== "" &&
        birth !== "" &&
        userPw !== "" &&
        passwordCheck === true
      ) {
        const userDataForApi = { userId, userPw, birth };
        const res = await signUpApi(userDataForApi);
        //   console.log(res.data);
        if (res.code === 200) {
          alert(signUpSuccess);
          setIsSignUpModal(false);
        } else if (res.code === 500) {
          alert(signUpCode500);
        }
      } else if (userId !== "" && birth !== "" && passwordCheck === false) {
        alert(signUpPwMismatch);
      } else {
        alert(signUpError);
      }
    } catch (error) {
      // console.error("가입에 실패했습니다:", error);
      alert(signUpCatchError);
    }
  };

  const userDataFunction = () => {
    if (isSignUpModal) {
      setUserData({
        userId: "",
        userPw: "",
        birth: "",
        confirmPassword: "",
      });
    }
  };

  useEffect(() => {
    userDataFunction();
  }, [isSignUpModal]);

  return (
    <SignUpModalWrap isSignUpModal={isSignUpModal}>
      <ModalCloseButton
        src={ico_close}
        alt="닫기"
        onClick={() => setIsSignUpModal(false)}
      />
      <SignUpInputWrap>
        {SIGN_UP_INPUT.map((input) => (
          <div key={input.id}>
            <label htmlFor={input.id}>
              {input.label}
              <span>*</span>
            </label>
            <input
              type={input.type}
              id={input.id}
              name={input.name}
              placeholder={input.placeholder}
              value={userData[input.name]}
              onChange={(e) => onChangeUserDataHandler(e, setUserData)}
            ></input>
          </div>
        ))}
      </SignUpInputWrap>
      <SignUpButtonContents>
        <button
          type="submit"
          onClick={() => onClickSignUpButton(userData, setIsSignUpModal)}
        >
          가입 완료
        </button>
      </SignUpButtonContents>
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
  margin: 97px 100px 10px;

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

const SignUpButtonContents = styled.section`
  display: flex;
  justify-content: center;

  gap: 20px;
  margin: 38px 100px 0;

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

const SIGN_UP_INPUT = [
  {
    id: "userId",
    name: "userId",
    type: "text",
    placeholder: "Username",
    label: "사용할 이름을 입력해주세요",
  },
  {
    id: "birth",
    name: "birth",
    type: "number",
    placeholder: "Birth Date",
    label: "생년월일을 입력해주세요(6자리)",
  },
  {
    id: "userPw",
    name: "userPw",
    type: "password",
    placeholder: "Password",
    label: "비밀번호를 입력해주세요",
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    placeholder: "Password",
    label: "한번 더 입력해주세요",
  },
];
