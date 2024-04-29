import React from "react";
import HeaderContents from "../../components/HeaderContents";
import styled from "styled-components";

const CreateBoard = () => {
  return (
    <>
      <HeaderContents />
      <CreateBoardContainer>
        <CreateBoardWrap>
          <form>
            <InputField
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
            />
            <TextareaField
              type="textarea"
              name="content"
              placeholder="내용을 입력하세요"
            />
            <input
              style={{ marginTop: "10px" }}
              type="file"
              //모든 이미지 파일 허용
              accept="image/*"
              name="selectedFile"
            />
            <SubmitButton type="submit">게시물 작성</SubmitButton>
          </form>
        </CreateBoardWrap>
      </CreateBoardContainer>
    </>
  );
};

export default CreateBoard;

const CreateBoardContainer = styled.div``;

const CreateBoardWrap = styled.section`
  margin: 50px auto 0;
  padding: 33px;

  width: 800px;
  height: 700px;

  background: #fff;
  border-radius: 24px;

  box-shadow:
    inset 0px -12px 26px rgba(0, 0, 0, 0.1),
    2px 3px 10px rgba(0, 0, 0, 0.1);
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

const TextareaField = styled.textarea`
  margin-top: 20px;
  padding: 10px;

  width: 100%;
  height: 420px;

  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #bed9e3;

  &:focus {
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
  }
`;

const SubmitButton = styled.button`
  margin-top: 90px;
  padding: 10px 28px;
  float: right;

  font-size: 18px;
  font-weight: 500;

  color: #fff;
  background-color: #ffc338;

  box-shadow:
    inset 0px 1px 5px rgba(0, 0, 0, 0.05),
    2px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #ffc338;
  }
`;
