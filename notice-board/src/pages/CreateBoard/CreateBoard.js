import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderContents from "../../components/HeaderContents";

const CreateBoard = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    selectedFile: null,
    previewURL: null,
  });
  const { title, content, selectedFile, previewURL } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(); // 미리보기 생성
    reader.onloadend = () => {
      setFormData({
        ...formData,
        selectedFile: file, // 파일 객체를 상태에 설정
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
  const inputCompleteButton = () => {
    if (title !== "" && content !== "" && selectedFile !== null) {
      alert("작성이 완료되었습니다.");
      navigate("/notice-board");
    } else if (title !== "" && content !== "") {
      alert("이미지를 첨부해주세요");
    } else {
      alert("작성을 완료해주세요");
    }
  };
  const createBoardSubmit = (e) => {
    e.preventDefault();
    //   폼 제출의 기본 동작인 페이지 새로고침을 막음
    //   폼 데이터를 처리하고 다른 작업을 수행하는 코드를 추가
  };

  // 토큰 가져오기
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      alert("로그인 후 이용해주세요");
    }
  });

  return (
    <>
      <HeaderContents />
      <CreateBoardContainer>
        <CreateBoardWrap>
          {/* form 요소에서 발생하는 이벤트 중 하나. 사용자가 폼을 제출할 때 발생 */}
          <form onSubmit={createBoardSubmit}>
            <InputField
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력하세요"
              value={formData.title}
              onChange={handleInputChange}
            />
            <PreviewImgContents>
              {previewURL && <img src={previewURL} alt="" />}
            </PreviewImgContents>
            <TextareaField
              id="content"
              name="content"
              placeholder="내용을 입력하세요"
              value={formData.content}
              onChange={handleInputChange}
            />
            <input
              type="file"
              style={{ marginTop: "10px" }}
              accept="image/*"
              id="selectedFile"
              name="selectedFile"
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
