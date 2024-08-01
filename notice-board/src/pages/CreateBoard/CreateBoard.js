import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../api/CreateBoardApi";
import HeaderContents from "../../components/HeaderContents";
import CreateBoardForm from "./components/CreateBoardForm";
import { createBoardObject } from "../../utills/message";

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

  const { success, error, fillInValues, catchError } = createBoardObject;
  const onClickInputCompleteButton = async () => {
    try {
      const { boardTitle, boardDetail, imageSrc } = userInput;
      if (boardTitle !== "" && boardDetail !== "" && imageSrc.src !== "") {
        const response = await createBoard(userInput);
        if (response) {
          alert(success);
          navigate("/notice-board");
        } else {
          alert(error);
        }
      } else {
        alert(fillInValues);
      }
    } catch (error) {
      alert(catchError);
    }
  };

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const loginCallBackFunction = () => {
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
    loginCallBackFunction();
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
