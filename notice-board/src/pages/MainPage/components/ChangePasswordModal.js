import React, { useState } from "react";
import styled from "styled-components";
import { pwChangeObject } from "../../../utills/message";
import ico_close from "../../../images/ico_close.png";
import { useRecoilValue } from "recoil";
import { userId } from "../../../recoil/state";
import { pwChangeUpdateApi } from "../../../api/mainPageApi";

const ChangePasswordModal = (props) => {
  const [passwordData, setPasswordData] = useState({
    userPw: "",
    newUserPw: "",
    confirmUserPw: "",
  });
  const { isProfileUpdateModal, setIsProfileUpdateModal } = props;
  const dischargeUserId = useRecoilValue(userId);

  const onChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const { pwChangeSuccess } = pwChangeObject;

  const { userPw, newUserPw, confirmUserPw } = passwordData;
  const onClickPasswordChange = async () => {
    passwordChangeValidationHandle(newUserPw, confirmUserPw);

    await passwordChangeHandle(userPw, newUserPw);
  };

  const passwordChangeValidationHandle = (newUserPw, confirmUserPw) => {
    if (newUserPw !== confirmUserPw) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  const passwordChangeHandle = async (userPw, newUserPw) => {
    const passwordChangeData = {
      dischargeUserId,
      userPw,
      newUserPw,
    };

    const successHandle = (responseData) => {
      console.log(responseData);
      alert(pwChangeSuccess);
    };

    await pwChangeUpdateApi(passwordChangeData, successHandle);
  };

  return (
    <ProfileUpdateModal isProfileUpdate={isProfileUpdateModal}>
      <ModalCloseButton
        onClick={() => setIsProfileUpdateModal(false)}
        src={ico_close}
        alt="닫기"
      />
      <ProfileUpdateWrap>
        <h2>비밀번호 변경</h2>
        {CHANGE_PW_INPUT.map((input) => (
          <div key={input.id}>
            <label htmlFor={input.id}>
              {input.label}
              <span>*</span>
            </label>
            <input
              type="password"
              id={input.id}
              name={input.name}
              placeholder={input.placeholder}
              value={passwordData[input.name]}
              onChange={onChangePasswordInput}
            />
          </div>
        ))}
        <button onClick={onClickPasswordChange}>확 인</button>
      </ProfileUpdateWrap>
    </ProfileUpdateModal>
  );
};

export default ChangePasswordModal;

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

const CHANGE_PW_INPUT = [
  {
    id: "userPw",
    name: "userPw",
    label: "기존 비밀번호를 입력해주세요.",
    placeholder: "password",
  },
  {
    id: "newUserPw",
    name: "newUserPw",
    label: "새로운 비밀번호를 입력해주세요.",
    placeholder: "new password",
  },
  {
    id: "confirmUserPw",
    name: "confirmUserPw",
    label: "한번 더 입력해주세요.",
    placeholder: "new password",
  },
];
