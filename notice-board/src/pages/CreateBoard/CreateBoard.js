import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderContents from "../../components/HeaderContents";
import { createBoard } from "../../api/CreateBoardApi";

const CreateBoard = () => {
  const [formUserData, setFormUserData] = useState({
    userId: "",
    boardTitle: "",
    boardDetail: "",
    imageSrc: {
      title: "",
      src: "",
    },
    previewURL: null,
  });
  const {
    boardTitle,
    boardDetail,
    imageSrc: { src: previewURL },
  } = formUserData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormUserData({
      ...formUserData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(); // 미리보기 생성
    reader.onloadend = () => {
      setFormUserData({
        ...formUserData,
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

  const inputCompleteButton = async () => {
    const { boardTitle, boardDetail, imageSrc } = formUserData;
    try {
      if (boardTitle !== "" && boardDetail !== "" && imageSrc.src !== "") {
        await createBoard(formUserData); // API 호출
        alert("작성이 완료되었습니다.");
        navigate("/notice-board", { state: { reload: true } });
      } else if (boardTitle === "" || boardDetail === "") {
        alert("모든 필드를 입력해주세요.");
      } else {
        alert("이미지를 첨부해주세요.");
      }
    } catch (error) {
      console.error("게시물 작성 실패", error);
      alert("게시물 작성에 실패했습니다.");
    }
  };

  // 토큰 가져오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      alert("로그인 후 이용해주세요");
    }
  }, [navigate]);

  return (
    <>
      <HeaderContents />
      <CreateBoardContainer>
        <CreateBoardWrap>
          <form>
            <InputField
              type="text"
              id="boardTitle"
              name="boardTitle"
              placeholder="게시글 제목"
              value={boardTitle}
              onChange={handleInputChange}
            />
            <PreviewImgContents>
              {previewURL && <img src={previewURL} alt="" />}
            </PreviewImgContents>
            <TextareaField
              id="boardDetail"
              name="boardDetail"
              placeholder="게시글 내용"
              value={boardDetail}
              onChange={handleInputChange}
            />
            <input
              type="file"
              style={{ marginTop: "10px" }}
              accept="image/*"
              id="imageSrc"
              name="imageSrc"
              onChange={handleFileChange}
            />
          </form>
          <CreateBoardButtonContainer>
            <CancelButton onClick={handleCancelButton}>돌아가기</CancelButton>
            <SubmitButton type="submit" onClick={inputCompleteButton}>
              게시물 작성
            </SubmitButton>
          </CreateBoardButtonContainer>
        </CreateBoardWrap>
      </CreateBoardContainer>
    </>
  );
};

export default CreateBoard;

const CreateBoardContainer = styled.div``;

const CreateBoardWrap = styled.section`
  margin: 40px auto 0;
  padding: 33px;

  width: 800px;
  height: 720px;

  background: #fff;
  border-radius: 24px;

  box-shadow:
    rgba(14, 30, 37, 0.1) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.2) 0px 2px 16px 0px;
  box-sizing: border-box;
`;

const InputField = styled.input`
  padding: 10px;

  width: 100%;

  border-radius: 4px;
  box-sizing: border-box;
  border-bottom: 1px solid #bed9e3;

  &:focus {
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
  }
`;

const PreviewImgContents = styled.div`
  margin-top: 10px;

  height: 300px;

  img {
    height: 300px;
  }
`;

const TextareaField = styled.textarea`
  margin-top: 10px;
  padding: 10px;

  width: 100%;
  height: 220px;

  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #bed9e3;

  &:focus {
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
  }
`;

const CreateBoardButtonContainer = styled.div`
  display: flex;
  float: right;

  gap: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 30px;

  font-size: 16px;
  font-weight: bold;

  border: 1px solid #666;
  border-radius: 4px;
  color: white;
  background-color: #66bacf;

  box-shadow:
    inset 0px -2px 8px rgba(0, 0, 0, 0.1),
    2px 3px 10px rgba(0, 0, 0, 0.1);

  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #3a809b;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;

  font-size: 16px;
  font-weight: bold;

  border: 1px solid #666;
  border-radius: 4px;
  color: white;
  background-color: #66bacf;

  box-shadow:
    inset 0px -2px 8px rgba(0, 0, 0, 0.1),
    2px 3px 10px rgba(0, 0, 0, 0.1);

  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #3a809b;
  }
`;
