import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createNewBoardApi } from "../../api/createBoardApi";
import { createBoardObject } from "../../utills/message";
import HeaderContents from "../../components/HeaderContents";
import CreateBoardForm from "./components/CreateBoardForm";

const CreateBoard = () => {
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

  const {
    createBoardSuccess,
    createBoardError,
    createBoardFillInValues,
    createBoardCatchError,
  } = createBoardObject;
  const onClickInputCompleteButton = async () => {
    try {
      const { boardTitle, boardDetail, imageSrc } = userInput;
      if (boardTitle !== "" && boardDetail !== "" && imageSrc.src !== "") {
        const response = await createNewBoardApi(userInput);
        if (response) {
          alert(createBoardSuccess);
          navigate("/notice-board");
        } else {
          alert(createBoardError);
        }
      } else {
        alert(createBoardFillInValues);
      }
    } catch (error) {
      alert(createBoardCatchError);
    }
  };

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  //함수명변경
  const checkAuthentication = () => {
    if (!token) {
      navigate("/");
      alert("로그인 후 이용해주세요");
    } else {
      setUserInput((prevState) => ({
        ...prevState,
        userId: userId,
      }));
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [navigate]);

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

export default CreateBoard;
