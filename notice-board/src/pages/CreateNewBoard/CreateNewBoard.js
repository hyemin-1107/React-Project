import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authToken, userId } from "../../recoil/state";
import { createBoardObject } from "../../utills/message";
import HeaderContents from "../../components/HeaderContents";
import CreateBoardForm from "./components/CreateBoardForm";
import { createNewBoardApi } from "../../api/createNewBoardApi";

const CreateNewBoard = () => {
  const setDischargeAuthToken = useRecoilValue(authToken);
  const setDischargeUserId = useRecoilValue(userId);

  const [userInput, setUserInput] = useState({
    userId: "",
    boardTitle: "",
    boardDetail: "",
    imageSrc: {
      title: "",
      src: "",
    },
    previewURL: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(); // 미리보기 생성
    reader.onloadend = () => {
      setUserInput({
        ...userInput,
        imageSrc: {
          title: file.name,
          src: reader.result,
        },
        previewURL: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();
  const handleCancelButton = () => {
    navigate("/notice-board");
  };

  const { createBoardSuccess } = createBoardObject;

  const onClickInputCompleteButton = () => {
    createBoardHandle();
  };

  const createBoardHandle = async () => {
    const successHandle = () => {
      alert(createBoardSuccess);
      navigate("/notice-board");
    };

    const { boardTitle, boardDetail, imageSrc } = userInput;
    if (boardTitle && boardDetail && imageSrc.src) {
      await createNewBoardApi(userInput, successHandle);
    }
  };

  const checkAuthentication = () => {
    if (!setDischargeAuthToken) {
      navigate("/");
      alert("로그인 후 이용해주세요");
    } else {
      setUserInput((prevState) => ({
        ...prevState,
        userId: setDischargeUserId, // Recoil에서 가져온 userId 설정
      }));
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [setDischargeAuthToken, navigate, userId]);

  return (
    <>
      <HeaderContents />
      <CreateBoardForm
        userInput={userInput}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleCancelButton={handleCancelButton}
        onClickInputCompleteButton={onClickInputCompleteButton}
      />
    </>
  );
};

export default CreateNewBoard;
